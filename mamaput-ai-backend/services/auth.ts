import { betterAuth } from "better-auth";
import dotenv from "dotenv";
dotenv.configDotenv({ path: "./.env" });

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    "http://localhost:3005", 
    "http://localhost:3005/api/auth",
    "http://localhost:5173"
  ],
  socialProviders: {
    google: {
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
      redirectURI: "http://localhost:3005/api/auth/callback/google",
    },
  },
});
