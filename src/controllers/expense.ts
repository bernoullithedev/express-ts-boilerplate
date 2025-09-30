import { controllerWrapper } from "../lib/controllerWrapper";
import { response } from "../middlewares/response";
import { sql } from "../utils/db";

export const createExpense = controllerWrapper(async (req, _res) => {
    // Logic to create an expense would go here
const { amount, user_id, title, category,type } = req.body;
if(amount===undefined || !user_id || !title||!category ||!type){
    response.failure({
        status: 400,
        message: "Missing required fields",
    });
    return;
}

const result= await sql`INSERT INTO transactions (user_id, title, amount,category,type) VALUES (${user_id}, ${title}, ${amount}, ${category},${type}) RETURNING *`;

    response.success({
        data:result,
        message: "Expense created successfully",
    });
});
export const getExpenses = controllerWrapper(async (_req, _res) => {
    // Logic to get expenses would go here
    const expenses = await sql`SELECT * FROM transactions`;
    console.log(expenses);
    response.success({
        data: expenses,
        message: "List of expenses",
    });
});

export const getUserExpenses = controllerWrapper(async (req, _res) => {
    // Logic to get a single expense by ID would go here
    const { userId } = req.params;
    const expense = await sql`SELECT * FROM transactions WHERE user_id = ${userId}`;
    if (expense.length === 0) {
        response.fail({
            status: 404,
            message: "Expense not found",
        });
        return;
    }
    response.success({
        data: expense,
        message: "Expense details",
    });
});

export const getUserSummary = controllerWrapper(async (req, _res) => {
    // Logic to get a summary of expenses for a user would go here
    const { userId } = req.params;
    const balanceResult = await sql`
    SELECT COALESCE(SUM(amount), 0) AS balance FROM transactions WHERE user_id = ${userId}`;

    const incomeResult = await sql`
    SELECT COALESCE(SUM(amount), 0) AS income FROM transactions WHERE user_id = ${userId} AND amount > 0`;
 
    const expenseResult = await sql`
    SELECT COALESCE(SUM(amount), 0) AS expense FROM transactions WHERE user_id = ${userId} AND amount < 0`;

    const summary = {
        balance: balanceResult[0]?.balance || 0,
        income: incomeResult[0]?.income || 0,
        expense: expenseResult[0]?.expense || 0,
    };

    

    response.success({
        data: summary,
        message: "User expense summary",
    });
});

export const deleteExpense = controllerWrapper(async (req, _res) => {
    // Logic to delete an expense by ID would go here
    const { id } = req.params;
    if (!id|| id.trim() === "" || isNaN(Number(id))) {
        response.failure({
            status: 400,
            message: "Expense ID is required and must be a valid number",
        });
        return;
    }
    const result = await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *`;
    if (result.length === 0) {
        response.fail({
            status: 404,
            message: "Expense not found",
        });
        return;
    }
    response.success({
        data: result,
        message: "Expense deleted successfully",
    });
});