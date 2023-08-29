export interface User {
    id: number;
    username: string;
    email: string;
    posts_url: string;
    subscribed_subreadits_url: string;
}

export interface AuthenticatedUser {
    user: User;
    token: string;
    expiry: Date;
}
