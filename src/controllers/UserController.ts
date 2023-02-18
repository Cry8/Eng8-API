import { Request, Response } from "express"
import { UserCreationPayload } from "../../interfaces/user";
import SendResponse from "../../services/responderService";
import { User, User as UserModel} from '../models/User';
import bcrypt from 'bcrypt';
import { generateOTP } from '../../services/otpService';
import { sendMail } from '../../services/mailingService';

import 'dotenv/config';
import { OTPGenerateOutput } from "../../interfaces/common";
import { encrypt } from "../../services/tokenService";
import { Brand } from "../models/Brand";
import { Fan } from "../models/Fan";


export async function createUser(req: Request, res: Response) {
        try {
            const { email, password, user_type, username }: UserCreationPayload = req.body;
        
            // Hash password stored on the database
            const hashedPassword: string = await bcrypt.hash(password, 10);

            // Check for duplicate usernames
            const userWithSameUsername = await UserModel.query().findOne({ username });


            if(userWithSameUsername) {
                return SendResponse({
                    data: "A User with username already exists!",
                    responseObj: res,
                    status: false,
                    statusCode: 400
                })
            }
            
            // check for duplicate email
            const userWithSameEmail: UserModel | undefined = await UserModel.query().findOne({ email });

            if(userWithSameEmail) {
                return SendResponse({
                    data: "A User with email address already exists!",
                    responseObj: res,
                    status: false,
                    statusCode: 400
                })
            }

            // Create user
            const user: UserModel= await UserModel.query().insert({
                email,
                username,
                user_type,
                password: hashedPassword,
            } as UserCreationPayload);

            // generate token
            const { status, data }: { status: boolean, data:  OTPGenerateOutput & string  } = await generateOTP(user.id);
            if (!status) {
                await UserModel.query().deleteById(user.id);
                return SendResponse({
                    data,
                    responseObj: res,
                    status: false,
                    statusCode: 500
                })
            }

            const data_to_encrypt = {
                user_id: user.id,
                purpose: "USER_VERIFICATION",
                otp_id: data.otp_id
            };

            const token: any = encrypt(data_to_encrypt);

            // send Otp over mail
            await sendMail(
                'Account Verification',
                email,
                `Dear ${username},`,
                `Hi! Please verify your account using otp ${data?.otp}`,
                'email'
            );

            return SendResponse({
                    data: {
                        message: `User Account for ${username} created successfully!`,
                        token
                    },
                    responseObj: res,
                    status: true,
                    statusCode: 201
                })

        } catch(err: any) {
            return SendResponse({
                statusCode: 500,
                status: false,
                responseObj: res,
                data: err.data || err
            })
        }
}


export async function authenticateUser(req: Request, res: Response) {
    try {
        const { email, password }: { email: string, password: string } = req.body;

        const user: User | undefined = await User.query().findOne({ email });

        if(!user) {
            return SendResponse({
                statusCode: 500,
                status: false,
                responseObj: res,
                data: "User with email does not exist!"
            })
        }

        const isPasswordCorrect: boolean = await bcrypt.compare(password, user.password);

        if ( !isPasswordCorrect) {
             return SendResponse({
                statusCode: 500,
                status: false,
                responseObj: res,
                data: "Password provided is not correct!"
            })
        }

        if (!user.is_verified) {
            const { status, data }: { status: boolean, data:  OTPGenerateOutput & string  } = await generateOTP(user.id);

            if (!status) {
                await UserModel.query().deleteById(user.id);
                return SendResponse({
                    data,
                    responseObj: res,
                    status: false,
                    statusCode: 500
                })
            }

            const data_to_encrypt = {
                user_id: user.id,
                purpose: "USER_VERIFICATION",
                otp_id: data.otp_id
            };

            const token: any = encrypt(data_to_encrypt);

            // send Otp over mail
            await sendMail(
                'Account Verification',
                email,
                `Dear ${user.username},`,
                `Hi! Please verify your account using otp ${data?.otp}`,
                'email'
            );

            return SendResponse({
                    data: {
                        message: `User Account  ${user.username} yet to be verified. please check your inbox!`,
                        verified: false,
                        token
                    },
                    responseObj: res,
                    status: true,
                    statusCode: 200
                })
        }

        const token: any = encrypt({ user_id: user.id, user_type: user.user_type }, '1h');

        return SendResponse({
                    data: {
                        message: `Welcome ${user.username}! Login sucessful`,
                        verified: true,
                        token
                    },
                    responseObj: res,
                    status: true,
                    statusCode: 200
            })



    } catch(err: any) {
        return SendResponse({
                statusCode: 500,
                status: false,
                responseObj: res,
                data: err.data || err
        })
    }

}

export async function getUserInfo(req: Request, res: Response) {
    try {
        // @ts-ignore
        const user_info: any = req.user;

        let info!: any;

        if (user_info.user_type == 'brand') {
            info = await Brand.query().findOne({ user_id: user_info.user_id }).withGraphFetched('user').withGraphFetched('upload');
        } 
        if (user_info.user_type == 'fan') {
            info = await Fan.query().findOne({ user_id: user_info.user_id }).withGraphFetched('user').withGraphFetched('upload');
        }

        return SendResponse({
            statusCode: 200,
            status: true,
            responseObj: res,
            data: info || {}
        })

    } catch (err: any) {
        return SendResponse({
                statusCode: 500,
                status: false,
                responseObj: res,
                data: err.data || err
        })
    }
}

export async function CheckIfUsernameExists(req: Request, res: Response) {
    try {
        const { username } = req.params;

        const doesUsernameExists: User | undefined = await User.query().findOne({ username });

        if (doesUsernameExists) {
            return SendResponse({
                statusCode: 200,
                status: true,
                responseObj: res,
                data: {
                    message: "Username already exists!",
                    status: false
                }
            })
        }

        SendResponse({
                statusCode: 200,
                status: true,
                responseObj: res,
                data: {
                    message: "Username is available!",
                    status: true
                }
        })

    } catch (err: any) {
        return SendResponse({
                statusCode: 500,
                status: false,
                responseObj: res,
                data: err.data || err
        })
    }
}