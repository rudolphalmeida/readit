import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserAuthService} from "./user-auth/user-auth.service";

@Injectable()
export class TokenInjectInterceptor implements HttpInterceptor {

    constructor(private userAuthService: UserAuthService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let token = this.userAuthService.loggedInUserToken;
        // Add the token to the headers if
        if (token) {
            request.headers.append('Authorization', `Token`);
        }
        return next.handle(request);
    }
}
