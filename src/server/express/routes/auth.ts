import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import pool from "../db.js";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "";

// POST /api/v1/auth/login
router.post("/login", async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // 1. Check if the user exists
    const userResult = await pool.query("SELECT * FROM auth.users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = userResult.rows[0];

    // 2. Verify password match
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 3. Generate a JWT token valid for 24 hours
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    // 4. Return token and safe user payload
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });

  } catch (error: any) {
    console.error("Login Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/v1/auth/register
router.post('/register', async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
  try {
    const userCheck = await pool.query('SELECT * FROM auth.users WHERE email = \$1', [email]);
    if (userCheck.rows.length > 0) return res.status(409).json({ error: 'A user with this email already exists' });
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await pool.query(
      'INSERT INTO auth.users (email, password_hash) VALUES (\$1, \$2) RETURNING id, email, created_at',
      [email, hashedPassword]
    );
    return res.status(201).json({ message: 'User registered successfully', user: newUser.rows[0] });
  } catch (error: any) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});


// POST /api/v1/auth/forgot-password
router.post("/forgot-password", async (req: Request, res: Response): Promise<any> => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // 1. Check if the user exists
    const userCheck = await pool.query("SELECT id FROM auth.users WHERE email = \$1", [email]);
    if (userCheck.rows.length === 0) {
      // return a vague success message
      return res.status(200).json({ message: "If that email exists, a reset link has been sent." });
    }

    // 2. Generate a secure random token
    const resetToken = crypto.randomBytes(32).toString("hex");
    
    // 3. Set expiration time for 1 hour from now
    const tokenExpires = new Date();
    tokenExpires.setHours(tokenExpires.getHours() + 1);

    // 4. Save the token and expiration to the user's record
    await pool.query(
      `UPDATE auth.users 
       SET reset_password_token = $1, reset_password_expires = $2 
       WHERE email = $3`,
      [resetToken, tokenExpires, email]
    );

    // 5. Send the email containing the token
    // TODO: Integrate your email service (Nodemailer, SendGrid, etc.)
    // Example link sent to user: https://yourfrontend.com\${resetToken}
    console.log(`Password reset link: http://localhost:3000/reset-password?token=${resetToken}`);

    return res.status(200).json({ message: "If that email exists, a reset link has been sent." });

  } catch (error: any) {
    console.error("Forgot Password Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/v1/auth/reset-password
router.post("/reset-password", async (req: Request, res: Response): Promise<any> => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: "Token and new password are required" });
  }

  try {
    // 1. Find user by token and verify it hasn't expired
    // NOW() checks the current database time against the expiration timestamp
    const userResult = await pool.query(
      `SELECT id FROM auth.users 
       WHERE reset_password_token = $1 AND reset_password_expires > NOW()`,
      [token]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "Password reset token is invalid or has expired" });
    }

    const userId = userResult.rows[0].id;

    // 2. Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // 3. Update the user's password and CLEAR the token fields so they can't be reused
    await pool.query(
      `UPDATE auth.users 
       SET password_hash = $1, reset_password_token = NULL, reset_password_expires = NULL 
       WHERE id = $2`,
      [hashedPassword, userId]
    );

    return res.status(200).json({ message: "Password updated successfully. You can now log in." });

  } catch (error: any) {
    console.error("Reset Password Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
