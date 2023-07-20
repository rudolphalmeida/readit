import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthenticatedUser } from './user-auth';
import { apiUrl } from '../api-util';
import { Observable, firstValueFrom, takeUntil } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserAuthService {
    user: AuthenticatedUser | null = null;

    constructor(private http: HttpClient) {}

    async login(username: string, password: string) {
        this.user = (await firstValueFrom(
            this.http.post(apiUrl('auth/login/'), {
                username: username,
                password: password,
            }),
        )) as AuthenticatedUser;
    }

    get isLoggedIn(): boolean {
        return this.user != null;
    }
}
