export interface UserCreationPayload {
    username: string;
    email: string;
    password: string;
    user_type: 'fan' | 'brand';
}

export interface User extends UserCreationPayload {
    id: string;
}