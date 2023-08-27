import {PaginatedEndpoint} from "../utils/paginated_endpoint";

export interface Subreadit {
    name: string;
    creator: string;
    owner: string;
}

export type SubreaditList = PaginatedEndpoint<Subreadit>;
