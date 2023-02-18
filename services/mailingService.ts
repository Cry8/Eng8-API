import SMTPTransport from 'nodemailer/lib/smtp-transport';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import { BaseModel } from '../interfaces/baseModel';
import 'dotenv/config';


const MAILING_HOST: string | undefined = process.env.MAILING_HOST;
const MAILING_USER: string | undefined =  process.env.MAILING_USER;
const MAILING_PASS: string | undefined = process.env.MAILING_PASS;

export async function sendMail<T>(subject: string, to: string, greeting: string, message: string, template: string = "email"): Promise<BaseModel<T>> {
   const transporter =  nodemailer.createTransport(new SMTPTransport({
        host: MAILING_HOST,
        port: 26,
        tls: {
            rejectUnauthorized: false
        },
        secure: false,
        auth: {
            user: MAILING_USER,
            pass: MAILING_PASS
        }
    }) );

    // use a template file with nodemailer
    transporter.use('compile', hbs({
        viewEngine: {
            partialsDir: path.resolve('./templates/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./templates/')
    }));

    let mailOptions = {
      from: 'auth@cry8.io',
      to,
      subject,
      template,
      context: {
        greeting,
        message
      }
    };

    try {
        await transporter.sendMail(mailOptions);
        return {
            status: true,
            data: "Mail Sent Sucessfully!"
        } as BaseModel<T>;

    } catch (err: any) {
        return {
            status: false,
            data: err
        } as BaseModel<T>;
    }

}