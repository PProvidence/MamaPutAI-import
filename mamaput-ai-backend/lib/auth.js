import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { configDotenv } from "dotenv";
import { Resend } from "resend";

configDotenv({ path: "./.env" });
const resend = new Resend(process.env.RESEND_API_KEY);

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    },
  },
  baseURL: "http://localhost:3005",
  trustedOrigins: ["http://localhost:5173", "https://api.mamaplaceai.tech"],

  plugins: [
    emailOTP({
      otpLength: 8,
      expiresIn: 300,
      async sendVerificationOTP({ email, otp, type }) {
        if (type == "email-verification") {
          await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: email,
            subject: "MamaPut AI Email Verification",
            html: `Your MamaPut AI OTP is <code>${otp}</code>.  
            This code is valid for <strong>5 minutes</strong>. Do not share it with anyone.
`,
          });
        }
      },
    }),
  ],
});
