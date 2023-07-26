import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom, takeUntil } from 'rxjs';

import { AuthenticatedUser } from './user-auth';
import { apiUrl } from '../api-util';
import {formatUsername, StorageKeys} from "../util";

@Injectable({
    providedIn: 'root',
})
export class UserAuthService {
    user: AuthenticatedUser | null = null;

    constructor(private http: HttpClient) {
        this.user = this.loadAuthUserFromLocalStorage();
        if (!this.user) return;

        // Remove the token if it has expired. Have the user login again
        if (this.user.expiry < new Date()) {
            this.removeAuthUserFromLocalStorage();
        }
    }

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

        this.storeAuthUserToLocalStorage(this.user);
    }

    async logout() {
        this.http.post(
            apiUrl('auth/logout/'), {}, {withCredentials: true}
        ).subscribe((_) => {
            this.removeAuthUserFromLocalStorage();
            this.user = null;
        });
    }

    loadAuthUserFromLocalStorage(): AuthenticatedUser | null {
        let token = localStorage.getItem(StorageKeys.AuthToken);
        if (!token) return null;

        let user = localStorage.getItem(StorageKeys.AuthUser);
        if (!user) return null;

        let parsedToken = JSON.parse(token);
        return  { user: JSON.parse(user), token: parsedToken.token, expiry: new Date(parsedToken.expiry)  };
    }

    storeAuthUserToLocalStorage(authUser: AuthenticatedUser) {
        const token = JSON.stringify({ token: authUser.token, expiry: authUser.expiry });
        localStorage.setItem(StorageKeys.AuthToken, token);
        localStorage.setItem(StorageKeys.AuthUser, JSON.stringify(authUser.user));
    }

    removeAuthUserFromLocalStorage() {
        localStorage.removeItem(StorageKeys.AuthToken);
        localStorage.removeItem(StorageKeys.AuthUser);
    }

    get isLoggedIn(): boolean {
        return this.user != null;
    }

    get loggedInUserName(): string | null {
        let username = this.user?.user.username;
        if (!username) return null;
        return username;
    }

    get loggedInUserToken(): string | null {
        let token = this.user?.token;
        if (!token) return null;
        return token;
    }
}
