import { JSONSchema, Model, RelationMappings, RelationMappingsThunk} from 'objection';
import ObjectionVisibility from "objection-visibility";
import { Upload } from './Upload';
import { User } from './User';


export class Brand extends ObjectionVisibility(Model) {
    id!: number;
    brand_name!: string;
    phone_number!: string;
    bio!: string;
    address!: string;
    city!: string;
    state!: string;
    country!: string;
    user_id!: number;
    brand_image!: number;



    static hidden = ["created_at", "updated_at"]


    static get tableName() {
        return 'brands';
    }

    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            required: ['brand_name', 'phone_number', 'bio', 'address', 'city', 'state', 'country', 'user_id', 'brand_image'],
            properties: {
                id: { type: 'integer' },
                brand_name: { type: 'string' },
                phone_number: { type: 'string', minLength: 11 },
                bio: { type: 'string' },
                address: { type: 'string' },
                city: { type: 'string' },
                state: { type: 'string' },
                country: { type: 'string' },
                user_id: { type: 'integer' },
                brand_image: { type: 'integer' } 
            }
        }
    }

    static relationMappings: RelationMappings | RelationMappingsThunk = {
        user: {
            relation: Model.HasOneRelation,
            modelClass: User,
            join: {
                from: 'brands.user_id',
                to: 'users.id'
            }
        },
        upload: {
            relation: Model.HasOneRelation,
            modelClass: Upload,
            join: {
                from: 'brands.profile_image',
                to: 'uploads.id'
            }
        }
    }
}