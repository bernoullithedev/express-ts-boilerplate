import { controllerWrapper } from "../lib/controllerWrapper";
import { response } from "../middlewares/response";

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

    response.success({
        data:[],
        message: "Expense created successfully",
    });
});
export const getExpenses = controllerWrapper(async (_req, _res) => {
    // Logic to get expenses would go here
    response.success({
        data: [],
        message: "List of expenses",
    });
});

export const getUserExpenses = controllerWrapper(async (req, _res) => {
    // Logic to get a single expense by ID would go here
    const { userId } = req.params;
    if (userId.length === 0) {
        response.fail({
            status: 404,
            message: "Expense not found",
        });
        return;
    }
    response.success({
        data: [],
        message: "Expense details",
    });
});

export const getUserSummary = controllerWrapper(async (_req, _res) => {
    // Logic to get a summary of expenses for a user would go here
    // const { userId } = req.params;

    const summary = {
        balance: 0,
        income: 0,
        expense: 0,
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
    const result = [];
    if (result.length === 0) {
        response.fail({
            status: 404,
            message: "Expense not found",
        });
        return;
    }
    response.success({
        data: [],
        message: "Expense deleted successfully",
    });
});