import 'dotenv/config';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.CRY8_SECRET ?? "";

export function encrypt(data: any, expiresIn: string = '5m'): string | Error {

    try {
        const token: string = jwt.sign(
            data,
            JWT_SECRET,
            {
                expiresIn
            }
        ) ?? "";

        return token;
    } catch (err: any) {
        return new Error("Token Generation failed!")
    }
   
}

export function decrypt(token: string): JwtPayload | string | Error {
  try {
    const decoded: string | JwtPayload = jwt.verify(token, JWT_SECRET);
    

    return decoded;
  } catch (err: any) {
     return new Error("Token decryption failed!")
  }
}