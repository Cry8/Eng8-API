import { Request, Response } from "express";
import SendResponse from "../../services/responderService";
import AddMinutesToDate from "../../utils/addTime";
import { OTPRequests, OTP } from '../models/Otp';
import { User } from "../models/User";
import 'dotenv/config';
import { OTPGenerateOutput } from "../../interfaces/common";
import { generateOTP } from '../../services/otpService';
import { sendMail } from "../../services/mailingService";
import jwt from 'jsonwebtoken';
import { decrypt, encrypt } from "../../services/tokenService";
import { OTPRequest, ResendOTPPayload } from "../../interfaces/Otp";



const USER_VERIFICATION: string = "USER_VERIFICATION";


export async function verifyOTP(req: Request, res: Response) {
    try {
        const { otp, token }: OTPRequest  = req.body;


        const { user_id, purpose }: any = decrypt(token);

        const requesting_user: User | undefined = await User.query().findById(user_id);

        if (!requesting_user) {
            return SendResponse({
                statusCode: 400,
                status: false,
                responseObj: res,
                data: "No such User exists! OTP Request did not originate from ENG8"
            })
        }

        if (purpose == USER_VERIFICATION) {
            if(Boolean(requesting_user.is_verified)) {
                return SendResponse({
                statusCode: 400,
                status: false,
                responseObj: res,
                data: "User has already been verified by OTP"
            })
            }
        }


        const [lastest_otp_request_from_user, ...rest]: OTPRequests[] = await OTPRequests.query()
                                                .select('otps_requests.*')
                                                .where('user_id', user_id)
                                                .orderBy('created_at', 'DESC');

        const { otp_id }: OTPRequests = lastest_otp_request_from_user;

        const otp_record: OTP | undefined = await OTP.query().findById(otp_id);


        if (!otp_record) {
            return SendResponse({
                statusCode: 400,
                status: false,
                responseObj: res,
                data: "Please request a new OTP!"
            })
        }


        if (Boolean(otp_record?.is_verified)) {
            return SendResponse({
                statusCode: 400,
                status: false,
                responseObj: res,
                data: "OTP has already been used"
            })
        }

        const is_same_otp: boolean = otp_record.otp == otp;


        const is_not_expired: boolean = AddMinutesToDate(new Date(), 60) < new Date(otp_record.expiration_time);

        if(!is_same_otp) {
            return SendResponse({
                statusCode: 400,
                status: false,
                responseObj: res,
                data: "OTP verification failed! OTP provided is not correct."
            })
        }

        if(!is_not_expired) {
            return SendResponse({
                statusCode: 400,
                status: false,
                responseObj: res,
                data: "OTP verification failed! OTP has already expired."
            })
        }


        await OTP.query()
            .patch({ is_verified: true })
            .findById(otp_record.id);

        if (purpose == USER_VERIFICATION) {
            await User.query()
            .patch({ is_verified: true })
            .findById(requesting_user.id);
        }

        return SendResponse({
                statusCode: 200,
                status: true,
                responseObj: res,
                data: {
                    message: 'OTP Verification is successful!',
                    user_id,
                    user_type: requesting_user?.user_type
                }
            }) 


    } catch(err: any) {
        return SendResponse({
                statusCode: 500,
                status: false,
                responseObj: res,
                data: err
            })
    }

}



export async function resendOTP(req: Request, res: Response) {
    try {
        const { token }: ResendOTPPayload = req.body;
        
        const { user_id, purpose, otp_id } : any = decrypt(token);

        if (!user_id && !purpose && !otp_id) {
            return SendResponse({
                statusCode: 500,
                status: false,
                responseObj: res,
                data: "An Error occurred unwrapping token! Token may be expired"
            })
        }
        

        const prev_otp: OTP | undefined = await OTP.query().findById(otp_id);


        if (!prev_otp) {
            return SendResponse({
                statusCode: 400,
                status: false,
                responseObj: res,
                data: 'An Error occurred! Token sent is invalid'
            })
        }

        if (prev_otp.is_verified) {
            return SendResponse({
                statusCode: 400,
                status: false,
                responseObj: res,
                data: 'Token sent is invalid!'
            })
        }

        const requesting_user: User | undefined = await User.query().findById(user_id);

        if (Boolean(requesting_user?.is_verified) && purpose === USER_VERIFICATION) {
            return SendResponse({
                statusCode: 400,
                status: false,
                responseObj: res,
                data: 'Verification Token requested for an already verified User'
            })
        }

        const { status, data }: { status: boolean, data:  OTPGenerateOutput & string  } = await generateOTP(requesting_user?.id ?? 0);

        if (!status) {
                return SendResponse({
                    data,
                    responseObj: res,
                    status: false,
                    statusCode: 500
                })
            }

        await sendMail(
                'Account Verification',
                requesting_user?.email ?? '',
                `Dear ${requesting_user?.username},`,
                `Hi! Please verify your account using otp ${data?.otp}`,
                'email'
            );

        await OTP.query().patch({
            is_verified: true
        })
        .findById(otp_id)

        return SendResponse({
                    data: {
                        message: `Token for ${requesting_user?.username} has been resent successfully!`,
                    },
                    responseObj: res,
                    status: true,
                    statusCode: 201
                })


    } catch (err: any) {
         return SendResponse({
                statusCode: 500,
                status: false,
                responseObj: res,
                data: err.message || err
            })
    }
}