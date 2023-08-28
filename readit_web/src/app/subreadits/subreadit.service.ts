import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SubreaditList} from "./subreadit";
import {apiUrl} from "../utils/api-util";

@Injectable({
    providedIn: 'root'
})
export class SubreaditService {

    constructor(private http: HttpClient) {
    }

    getUserSubscribedSubreaditsFromUrl(url: string): Observable<SubreaditList> {
        return this.http.get(url) as Observable<SubreaditList>;
    }

    getUserSubscribedSubreadits(username: string): Observable<SubreaditList> {
        return this.http.get(apiUrl(`subreadits/subscribed/u/${username}`)) as Observable<SubreaditList>;
    }
}
