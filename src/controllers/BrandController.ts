import { Request, Response } from "express";
import { Brand } from '../models/Brand';
import SendResponse from '../../services/responderService';
import { User } from "../models/User";

export async function createNewBrand(req: Request, res: Response) {
    try {
        // @ts-ignore
        const existingBrand: Brand | undefined = await Brand.query().findOne({ user_id: req.user.user_id });


        if (existingBrand) {
            return SendResponse({
                data: "Brand Account already exists for this user",
                responseObj: res,
                status: false,
                statusCode: 400
            })
        }

        // @ts-ignore
        const brand_user_account: User | undefined = await User.query().findById(req.user.user_id);

        if(!brand_user_account) {
            return SendResponse({
                data: "Something went wrong! Please re-login",
                responseObj: res,
                status: false,
                statusCode: 400
            })
        }


        if (brand_user_account.user_type == 'fan') {
            return SendResponse({
                data: "Brand Account cannot be created for a Fan!",
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

        const newBrand: Brand = await Brand.query().insert(data);

        return  SendResponse({
            data: {
                message: 'Brand Created Successfully!',
                brand_id: newBrand.id
            },
            responseObj: res,
            status: true,
            statusCode: 201
        })



    } catch(err: any) {
        return SendResponse({
            data: err.message || 'An Error occurred. Please try again',
            responseObj: res,
            status: false,
            statusCode: 500
        })
    }

}

export async function EditBrandInformation(req: Request, res: Response) {
    try {
        const data: any = req.body;

         // @ts-ignore
        const brand_user_account: User | undefined = await User.query().findById(req.user.user_id);

        if (!brand_user_account) {
            return SendResponse({
                data: "Please re-authenticate onto Eng8!",
                responseObj: res,
                status: false,
                statusCode: 400
            })
        }

        if (brand_user_account.user_type == 'fan') {
            return SendResponse({
                data: "Authenticated User is not a Brand!",
                responseObj: res,
                status: false,
                statusCode: 400
            })
        }
        // @ts-ignore
        const brand: Brand | undefined = await Brand.query().findOne({ user_id: req.user.user_id});

        if (!brand) {
            return SendResponse({
                data: "Brand does not exist",
                responseObj: res,
                status: false,
                statusCode: 500
            })
        }

        const updatedBrand: Brand | undefined = await Brand.query().patch(data).findById(brand.id);

        return SendResponse({
            data: {
                message: "Brand updated successfuly!",
                brand_id: brand.id
            },
            responseObj: res,
            status: true,
            statusCode: 200
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