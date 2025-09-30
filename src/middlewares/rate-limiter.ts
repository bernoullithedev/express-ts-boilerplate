import { RequestHandler } from "express";
import ratelimit from "../utils/upstash";

const rateLimiter:RequestHandler = async (_req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-ip");
        if (!success) {
            res.status(429).json({ message: "Too many requests, please try again later." });
            return 
        }
        next();
    } catch (error) {
        console.error("Rate limiting error:", error);
       res.status(500).json({ message: "Internal server error" });
    }
};

export default rateLimiter;