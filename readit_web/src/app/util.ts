export function formatSubreaditname(subreadit_name: string): string {
    return `r/${subreadit_name}`;
}

export enum StorageKeys {
    AuthToken = "auth_token",
    AuthUser = "auth_user",
}
