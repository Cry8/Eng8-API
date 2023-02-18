import { JSONSchema, Model } from "objection";

export class User extends Model {
    id!: number;
    username!: string;
    email!: string;
    user_type!: string;
    is_verified!: boolean;
    password!: string;
    created_at!: Date;
    updated_at!: Date;

    static get tableName() {
        return "users";
    }

    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            required: ['username', 'email', 'password', 'user_type'],

            properties: {
                id: { type: 'integer' },
                username: { type: 'string' },
                email: { type: 'string' },
                user_type: { type: 'string', enum: ['fan', 'brand'] },
                password: { type: 'string', minLength: 6 },
            }
        }
    }
}