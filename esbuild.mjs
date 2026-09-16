import dotenv from "dotenv";
dotenv.config({ override: true, quiet: true });
import { rmSync } from "fs";
import * as esbuild from "esbuild";
import { spawn } from "child_process";
import packageJSON from "./package.json" with { type: "json" };

// Remove the previous build directory
rmSync("./.local/express/dist", { recursive: true, force: true });

let serverProcess = null;

// Watch plugin — restarts the express server after every successful build
const watchPlugin = {
  name: "watch-plugin",
  setup(build) {
    build.onEnd((result) => {
      const timestamp = new Date().toLocaleTimeString();
      if (result.errors.length > 0) {
        console.error(`Build failed with ${result.errors.length} errors at ${timestamp}`);
      } else {
        console.log(`Build succeeded at ${timestamp}`);

        if (process.argv.includes("--watch") && !result.errors.length) {
          if (serverProcess) {
            console.log("Restarting server...");
            if (serverProcess.connected) {
              serverProcess.send("shutdown");
            }
            setTimeout(() => {
              if (serverProcess && !serverProcess.killed) {
                console.log("Server did not shut down gracefully, forcing kill");
                serverProcess.kill();
              }
              setTimeout(startServer, 1000);
            }, 1000);
          } else {
            console.log("Starting server...");
            startServer();
          }
        }
      }
    });
  },
};

function startServer() {
  serverProcess = spawn(
    "node",
    ["--enable-source-maps", "--inspect=8229", "./.local/express/dist/api.js"],
    {
      stdio: ["inherit", "inherit", "inherit", "ipc"],
    }
  );

  serverProcess.on("error", (err) => {
    console.error("Failed to start server:", err);
  });

  serverProcess.on("exit", (code, signal) => {
    if (code !== null && code !== 0) {
      console.log(`Server process exited with code ${code}`);
    } else if (signal) {
      console.log(`Server process killed with signal ${signal}`);
    }
  });
}

// Run esbuild with the specified options
const context = await esbuild.context({
  entryPoints: ["src/server/express/server.ts"],
  bundle: true,
  sourcemap: true,
  format: "esm",
  platform: "node",
  target: "node20",
  // Kept to support use of 'require' in dependencies.
  banner: {
    js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);",
  },
  external: [],
  outfile: "./.local/express/dist/api.js",
  tsconfig: "./tsconfig.json",
  plugins: [watchPlugin],
  define: {
    __APP_VERSION__: JSON.stringify(packageJSON.version),
    __GIT_COMMIT__: JSON.stringify(process.env.GIT_COMMIT || "localDev"),
  },
});

// Handle watch mode
const isWatchMode = process.argv.includes("--watch");

if (isWatchMode) {
  console.log("Watch mode started at", new Date().toLocaleString());
  console.log("Watching for changes...");

  process.on("SIGINT", async () => {
    console.log("\nShutting down watch mode...");
    if (serverProcess) {
      if (serverProcess.connected) {
        serverProcess.send("shutdown");
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
      if (!serverProcess.killed) {
        serverProcess.kill();
      }
    }
    await context.dispose();
    process.exit(0);
  });

  await context.watch();
} else {
  console.log("Running single build at", new Date().toLocaleString());
  await context.rebuild();
  await context.dispose();
}
