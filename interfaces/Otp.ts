export interface OTPCreationPayload {
    otp: string;
    expiration_time: string;
}

export interface OTP extends OTPCreationPayload {
    id: number | string;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
}

export interface OTPRequest {
    otp: string;
    token: string;
}

export interface ResendOTPPayload {
    token: string;
}
