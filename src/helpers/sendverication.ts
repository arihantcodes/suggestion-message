import {resend} from "@/lib/resend"

import Verification from "../../emails/verification"

import { ApiResponse } from "@/types/APiresponse"

export async function sendverication(
    email:string,
    username:string,
    otp:string


):Promise<ApiResponse> {

    try {
        await resend.emails.send({
            from: 'onboarding@suggestion-share.com',
            to: email,
            subject: 'Verification Code for Suggestion Share',
            react: Verification({ username, otp }),
          });
        return {
            success: true,
            message: " Verification email sent successfully"
        }
        
    } catch (emailError) {
        console.error("Email not send", emailError)
        return {
            success: false,
            message: "Failed to send email verification "
        }
    }
}