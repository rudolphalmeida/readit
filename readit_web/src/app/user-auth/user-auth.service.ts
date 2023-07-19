import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthenticatedUser } from './user-auth';
import { apiUrl } from '../api-util';

@Injectable({
    providedIn: 'root',
})
export class UserAuthService {
    user: AuthenticatedUser | null = null;

    constructor(private http: HttpClient) {}

    login(username: string, password: string) {
        this.http.post(apiUrl('auth/login'), {
            username: username,
            password: password,
        });
    }

    get isLoggedIn(): boolean {
        return this.user != null;
    }
}
