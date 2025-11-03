import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";
import { response } from "./response";

// Extend Express Request type to include session and user
// declare global {
//   namespace Express {
export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
}
      session?: {
        id: string;
        userId: string;
        expiresAt: Date;
      };
    }
//   }
// }

/**
 * Middleware to verify authentication
 * Checks for valid session and attaches user to request
 */
export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const session = await auth.api.getSession({
      headers: req.headers as any
    });

    if (!session) {
      response.unauthorized({
        message: "Authentication required. Please log in.",
      })
      return;
    }

    // Attach user and session to request
    req.user = session.user;
    req.session = session.session;

    next();
  } catch (error) {
    response.unauthorized({
      message: "Invalid or expired session.",
    });
  }
}

/**
 * Optional auth middleware
 * Attaches user if authenticated but doesn't require it
 */
export async function optionalAuth(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const session = await auth.api.getSession({
      headers: req.headers as any,
    });

    if (session) {
      req.user = session.user;
      req.session = session.session;
    }

    next();
  } catch (error) {
    // Fail silently for optional auth
    next();
  }
}
