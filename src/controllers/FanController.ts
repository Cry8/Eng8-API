import { Request, Response } from "express";
import SendResponse from '../../services/responderService';
import { Fan } from "../models/Fan";
import { User } from "../models/User";


export async function createNewFan(req: Request , res: Response) {
    try {
        // @ts-ignore
        const existingFan: Fan | undefined = await Fan.query().findOne({ user_id: req.user.user_id });

        if (existingFan) {
            return SendResponse({
                data: "Fan Account already exists for this user",
                responseObj: res,
                status: false,
                statusCode: 400
            })
        }
        
        // @ts-ignore
        const fan_user_account: User | undefined = await User.query().findById(req.user.user_id);

        if(!fan_user_account) {
            return SendResponse({
                data: "Something went wrong! Please re-login",
                responseObj: res,
                status: false,
                statusCode: 400
            })
        }


        if (fan_user_account.user_type == 'brand') {
            return SendResponse({
                data: "Fan Account cannot be created for Brand!",
                responseObj: res,
                status: false,
                statusCode: 400
            })
        }

        const data = {
            ...req.body,
            // @ts-ignore
            user_id: req.user.user_id
        };


        const newFan: Fan = await Fan.query().insert(data);

        return  SendResponse({
            data: {
                message: 'Fan Created Successfully!',
                fan_id: newFan.id
            },
            responseObj: res,
            status: true,
            statusCode: 201
        })

    } catch (err: any) {
         return SendResponse({
            data: err.message || 'An Error occurred. Please try again',
            responseObj: res,
            status: false,
            statusCode: 500
        })
    }
}