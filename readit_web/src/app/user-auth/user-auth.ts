export interface User {
    url: string;
    username: string;
    email: string;
    groups: any[];
}

export interface AuthenticatedUser {
    user: User;
    token: string;
    expiry: Date,
}
