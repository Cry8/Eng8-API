import { Request, Response } from "express";
import SendResponse from '../../services/responderService';
import { upload as sendToCloudinary } from "../../utils/cloudinary";
import { Upload } from "../models/Upload";

export async function addNewUpload(req: Request, res: Response) {
    try {
        if (!req.file) {
            return SendResponse({
                status: false,
                statusCode: 400,
                responseObj: res,
                data: 'Please add a file'
            });
        }

        const acceptedFileTypes: string[] = ['image/jpeg', 'image/png', 'image/jpg']; 

        if (!acceptedFileTypes.includes(req.file.mimetype)) {
            return SendResponse({
                status: false,
                statusCode: 400,
                responseObj: res,
                data: "Format supported include: JPG, PNG, JPEG"
            })
        }

        const cloudFile = await sendToCloudinary(req.file.path);

        const newUpload: Upload = await Upload.query().insert({
            upload_link: cloudFile.secure_url
        });


        return SendResponse({
                status: true,
                statusCode: 200,
                responseObj: res,
                data: {
                    message: 'File uploaded successfully!',
                    upload_data: {
                        id: newUpload.id,
                        url: newUpload.upload_link
                    }

                }
        });

    } catch (err: any) {
        return SendResponse({
                statusCode: 500,
                status: false,
                responseObj: res,
                data: err.data || err
        })
    }
}


export async function getUpload(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const existingUpload: Upload | undefined = await Upload.query().findById(id);

        if(!existingUpload) {
            return SendResponse({
                statusCode: 400,
                status: false,
                responseObj: res,
                data: `Upload with id=${id} does not exist!`
            })
        }


        return SendResponse({
                status: true,
                statusCode: 200,
                responseObj: res,
                data: {
                    message: 'File uploaded successfully!',
                    upload_data: {
                        id: existingUpload.id,
                        url: existingUpload.upload_link
                    }

                }
        });



    } catch(err: any) {
        return SendResponse({
                statusCode: 500,
                status: false,
                responseObj: res,
                data: err.data || err
        })
    }

}

export async function deleteUserUpload(req: Request, res: Response) {

}

