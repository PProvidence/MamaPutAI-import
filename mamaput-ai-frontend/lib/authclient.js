import { createAuthClient } from "better-auth/react"
import { emailOTPClient } from "better-auth/client/plugins"

const API_URL = import.meta.env.API_URL || "http://localhost:3005";
export const authClient =  createAuthClient({
    baseURL:  API_URL ,
    plugins: [
        emailOTPClient()
    ]
})