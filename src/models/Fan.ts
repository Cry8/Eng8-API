import { JSONSchema, Model,  RelationMappings, RelationMappingsThunk} from 'objection';
import { User } from './User';

export class Fan extends Model {
    id!: number;
    full_name!: number;
    phone_number!: string;
    bio!: string;
    address!: string;
    city!: string;
    state!: string;
    country!: string;
    user_id!: number;
    profile_image!: number;

    static get tableName() {
        return 'fans';
    }

    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            required: ['full_name', 'phone_number', 'bio', 'address', 'city', 'state', 'country', 'user_id', 'profile_image'],
            properties: {
                full_name: { type: 'string' },
                phone_number: { type: 'string', minLength: 11 },
                bio: { type: 'string' },
                address: { type: 'string' },
                city: { type: 'string' },
                state: { type: 'string' },
                country: { type: 'string' },
                user_id: { type: 'integer' },
                profile_image: { type: 'integer' } 
            }
        }
    }

    static relationMappings: RelationMappings | RelationMappingsThunk = {
        user: {
            relation: Model.HasOneRelation,
            modelClass: User,
            join: {
                from: 'fans.user_id',
                to: 'users.id'
            }
        }
    }
}