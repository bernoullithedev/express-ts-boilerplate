import { Router } from "express";

const router = Router();
router.get("/", (_req, res) => {
    res.send("Auth routes");
})

// Better-Auth automatically handles these routes:
// POST /api/auth/sign-up/email
// POST /api/auth/sign-in/email
// POST /api/auth/sign-out
// GET  /api/auth/session
// GET  /api/auth/callback/google (OAuth callback)
// And more...



export default router;
