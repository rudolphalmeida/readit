import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom, takeUntil } from 'rxjs';

import { AuthenticatedUser } from './user-auth';
import { apiUrl } from '../api-util';
import {formatUsername} from "../util";

@Injectable({
    providedIn: 'root',
})
export class UserAuthService {
    user: AuthenticatedUser | null = null;

    constructor(private http: HttpClient) {}

    async login(username: string, password: string) {
        const credentials = btoa(`${username}:${password}`);

        let httpHeaders = new HttpHeaders();
        httpHeaders.append('Content-Type', 'application/json');
        httpHeaders.append('Authorization', `Basic ${credentials}`);

        this.user = (await firstValueFrom(
            this.http.post(
                apiUrl('auth/login/'),
                {},
                { headers: httpHeaders, withCredentials: true },
            ),
        )) as AuthenticatedUser;

        console.log(this.user);
    }

    get isLoggedIn(): boolean {
        return this.user != null;
    }

    get loggedInUserName(): string | null {
        let username = this.user?.user.username;
        if (!username) return null;
        return formatUsername(username);
    }
}
