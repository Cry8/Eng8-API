import { JSONSchema, Model, AjvValidator } from 'objection';
import addFormats from 'ajv-formats';

export class OTP extends Model {
    id!: number;
    otp!: string;
    is_verified!: boolean;
    expiration_time!: string;
    created_at!: Date;
    updated_at!: Date;

    static get tableName() {
        return "otps";
    }

    static createValidator() {
      return new AjvValidator({
        onCreateAjv: (ajv) => {
          addFormats(ajv)
        },
        options: {
          allErrors: true,
          validateSchema: true,
          ownProperties: true
        },
      })
    }

    static idColumn: string = "id";

    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            required: ['otp', 'expiration_time'],
            properties: {
                id: { type: 'integer' },
                otp: { type: 'string', minLength: 6, maxLength: 6 },
                is_verified: { type: 'boolean', default: false },
                expiration_time: { type: 'string', format: 'date-time' }
            }
        }
    }
}


export class OTPRequests extends Model {
    id!: number;
    user_id!: number;
    otp_id!: number;
    created_at!: Date;
    updated_at!: Date;

    static tableName: string = "otps_requests";

    static idColumn: string = "id";
    
    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            required: ['user_id', 'otp_id'],
            properties: {
                id: { type: 'integer' },
                user_id: { type: 'integer' },
                otp_id: { type: 'integer' }
            }
        }
    } 
}