import { Request } from "express";

export interface OTPGenerateOutput {
    otp: string;
    expiration_time: string;
    otp_id: number;
    user_id: number;
}

export interface AuthenticatedUserRequest extends Request {
    user_id: string
}