import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserAuthService } from "../user-auth/user-auth.service";

@Injectable()
export class TokenInjectInterceptor implements HttpInterceptor {
    constructor(private userAuthService: UserAuthService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let token = this.userAuthService.loggedInUserToken;
        // Add the token to the headers if it exists
        if (token) {
            let headers = request.headers;
            headers = headers.append("Authorization", `Token ${token}`);
            request = request.clone({ headers: headers });
        }
        return next.handle(request);
    }
}
