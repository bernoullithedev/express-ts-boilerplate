import express from "express";
import authRoutes from "./routes/auth";

const router = express.Router();

// Auth routes - handles /api/auth/*
router.use("/auth", authRoutes);

// router.get("/health", healthCheck);

// router.post("/transactions",createExpense);

// router.get("/transactions",getExpenses);

// router.get("/transactions/user/:userId",getUserExpenses);

// router.get("/transactions/summary/:userId",getUserSummary);

// router.delete("/transactions/:id",deleteExpense);




export default router;
