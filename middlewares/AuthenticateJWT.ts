import { NextFunction, Request, Response } from "express";
import SendResponse from '../services/responderService';
import jwt from 'jsonwebtoken';
import 'dotenv/config';


const JWT_SECRET = process.env.CRY8_SECRET ?? "";

export default function AuthenticateJWT(req: Request, res: Response, next: NextFunction) {
    const auth_header = req.headers.authorization;


    if (auth_header) {
        const token = auth_header?.split(' ')[1];

        jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
            if (err) {
                return SendResponse({
                    data: "User is unauthorized!",
                    responseObj: res,
                    status: false,
                    statusCode: 403
                })
            }
            
            // @ts-ignore
            req.user = user;

            next()
        })

        
    } else {
        return SendResponse({
            data: "No auth header provided!",
            responseObj: res,
            status: false,
            statusCode: 401
        })
    }



}