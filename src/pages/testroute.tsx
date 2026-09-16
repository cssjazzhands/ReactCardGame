import { JSX, useEffect } from "react";
import styles from "./testroute.module.css";

type StackItem = {
  name: string;
  version?: string;
  role: string;
  category: string;
};

type Props = { onClose: () => void };

const STACK: StackItem[] = [
  { name: "React", version: "19", role: "UI library", category: "Frontend" },
  { name: "TypeScript", version: "6", role: "Type-safe JavaScript", category: "Language" },
  { name: "Vite", version: "8", role: "Dev server & bundler", category: "Tooling" },
  { name: "Express", version: "5", role: "REST API server", category: "Backend" },
  { name: "React Router", version: "7", role: "Client-side routing", category: "Frontend" },
  { name: "CSS Modules", role: "Scoped component styles", category: "Frontend" },
  { name: "Vitest", version: "4", role: "Unit & integration tests", category: "Testing" },
  { name: "ESLint", role: "JavaScript linting", category: "Tooling" },
  { name: "Stylelint", role: "CSS linting", category: "Tooling" },
  { name: "Prettier", role: "Code formatting", category: "Tooling" },
  { name: "esbuild", role: "Server-side TypeScript bundling", category: "Tooling" },
  { name: "Docker", role: "Containerized deployment", category: "Infrastructure" },
  { name: "nginx", role: "Reverse proxy & static serving", category: "Infrastructure" },
];

const CATEGORIES = [...new Set(STACK.map((s) => s.category))];

const TechStackModal = ({ onClose }: Props): JSX.Element => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.modal}>
        <button className={styles["close-btn"]} onClick={onClose} aria-label="Close">
          ×
        </button>
        <header className={styles.header}>
          <h2 className={styles.title}>Tech Stack</h2>
          <p className={styles.subtitle}>Technologies powering this template</p>
          {import.meta.env.VITE_ENV_VALUE && (
            <p className={styles["env-note"]}>
              Runtime env: <code>{import.meta.env.VITE_ENV_VALUE}</code>
            </p>
          )}
        </header>

        {CATEGORIES.map((category) => (
          <section key={category} className={styles.section}>
            <h3 className={styles["category-title"]}>{category}</h3>
            <div className={styles.items}>
              {STACK.filter((s) => s.category === category).map((item) => (
                <div key={item.name} className={styles.item}>
                  <div className={styles["item-name"]}>
                    {item.name}
                    {item.version && <span className={styles.version}>v{item.version}</span>}
                  </div>
                  <div className={styles["item-role"]}>{item.role}</div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default TechStackModal;
