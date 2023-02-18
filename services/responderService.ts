import { Response } from "express"
import { BaseModel } from "../interfaces/baseModel"


export default function Responder(response:{statusCode: number, status: boolean, data: any, responseObj: Response}): Response {
    return response.responseObj.status(response.statusCode).json(
        {
            status: response.status,
            data: response.data,
        } as BaseModel<typeof response.data>
    )
}