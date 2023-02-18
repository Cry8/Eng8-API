import 'dotenv/config';
import { v2 as Cloudinary } from 'cloudinary';

Cloudinary.config({
    cloud_name: process.env.CLOUD_NAME_CLDNARY,
    api_key: process.env.API_KEY_CLDNARY,
    api_secret: process.env.API_SECRET_CLDNARY
})


export async function upload(file: any, folderName: string = "default") {
    const image = await Cloudinary.uploader.upload(
        file,
        {
            folder: folderName
        },
        (result: any) => result
    )

    return image;
}