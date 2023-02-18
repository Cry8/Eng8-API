import { BaseModel } from "../interfaces/baseModel";
import { OTP, OTPRequests } from "../src/models/Otp";
import OTPGenerator from 'otp-generator';
import AddMinutesToDate from "../utils/addTime";

export async function generateOTP<T>(user_id: number): Promise<BaseModel<T>> {
    try {
        const otp = OTPGenerator.generate(6, { specialChars: false, lowerCaseAlphabets: false, upperCaseAlphabets: false });
        const expiration_time: Date = AddMinutesToDate(new Date(), 65);
    

        const created_otp: OTP = await OTP.query().insert({
            otp,
            expiration_time: expiration_time.toISOString(),
        });
    
         await OTPRequests.query().insert({
            otp_id: created_otp.id,
            user_id: user_id
        });
    
    
        return {
            status: true,
            data: {
                otp,
                expiration_time,
                otp_id: created_otp.id,
                user_id: user_id
            }
        } as BaseModel<T>
    } catch(err: any) {
        return {
            status: false,
            data: "Creation of OTP failed! Please try again"
        } as BaseModel<T>
    }

}