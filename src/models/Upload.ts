import { JSONSchema, Model } from 'objection';
import ObjectionVisibility from "objection-visibility";



export class Upload extends ObjectionVisibility(Model) {
    id!: number;
    upload_link!: string;
    is_active!: boolean;

    static hidden = ["created_at", "updated_at", "is_active"]

    static get tableName() {
        return 'uploads';
    }

    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            required: ['upload_link'],
            properties: {
                id: { type: 'integer' },
                upload_link: { type: 'string' },
                is_active: { type: 'boolean' }
            }
        }
    }
}