import express from "express";
import { healthCheck } from "./controllers/health";
import { createExpense, deleteExpense, getExpenses, getUserExpenses, getUserSummary } from "./controllers/expense";

const router = express.Router();

router.get("/health", healthCheck);

router.post("/transactions",createExpense);

router.get("/transactions",getExpenses);

router.get("/transactions/user/:userId",getUserExpenses);

router.get("/transactions/summary/:userId",getUserSummary);

router.delete("/transactions/:id",deleteExpense);




export default router;
