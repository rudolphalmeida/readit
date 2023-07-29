export interface User {
    id: number;
    username: string;
    email: string;
    posts_url: string;
}

export interface AuthenticatedUser {
    user: User;
    token: string;
    expiry: Date;
}
