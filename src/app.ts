import express from "express";
import morganLogger from "morgan";
import helmetSecurity from "helmet";
import corsMiddleware from "cors";
import cookieParserMiddleware from "cookie-parser";
import path from "node:path";
import responseMiddleware from "./middlewares/response";
import { handleError, handleNotFound } from "./middlewares/middlewares";
import { toNodeHandler } from "better-auth/node";
// Importing API routes
import apiRoutes from "./routes";
import rateLimiter from "./middlewares/rate-limiter";
import dotenv from "dotenv";
import { auth } from "./lib/auth";
dotenv.config();
const expressApp = express();
expressApp.use(rateLimiter)
expressApp.use(morganLogger("dev"));
expressApp.use(helmetSecurity());
expressApp.use(corsMiddleware());
expressApp.all('/api/auth/{*any}', toNodeHandler(auth));
expressApp.use(express.json());
expressApp.use(cookieParserMiddleware());
expressApp.use(responseMiddleware);

// Define root route
expressApp.get("/", (_req, res) => {
	res.sendFile(path.join(__dirname, "../public", "index.html"));
});


expressApp.use("/api", apiRoutes);

// Use custom middlewares for handling 404 and errors
expressApp.use(handleNotFound);
expressApp.use(handleError);

export default expressApp;
