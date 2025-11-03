import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { expo } from "@better-auth/expo";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
 
   plugins: [expo()],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true in production
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      enabled: !!process.env.GOOGLE_CLIENT_ID,
    },
    tiktok: {
      clientKey: process.env.TIKTOK_CLIENT_ID ||"",
      clientSecret: process.env.TIKTOK_CLIENT_SECRET ||"",
       enabled: !!process.env.TIKTOK_CLIENT_ID,
    },
    // TikTok configuration - you'll need to add TikTok OAuth credentials
    // Note: Better-Auth may not have native TikTok support yet
    // You may need to use a custom OAuth provider or wait for official support
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  
  },
  advanced: {
    generateId: () => {
      // Using cuid() for ID generation to match Prisma schema
      const { createId } = require("@paralleldrive/cuid2");
      return createId();
    },
    
  },
  trustedOrigins: [
    // process.env.CLIENT_URL || "http://localhost:3000",
    "outdoze://",
  ],
  
});

export type Session = typeof auth.$Infer.Session.session;
export type User = typeof auth.$Infer.Session.user;
