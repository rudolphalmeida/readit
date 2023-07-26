import {User} from "./user-auth/user-auth";

export interface Subreadit {
    name: string;
    creator: User;
    owner: User;
}
