export interface User {
    url: string;
    username: string;
    email: string;
}

export interface AuthenticatedUser {
    user: User;
    token: string;
    expiry: Date,
}
