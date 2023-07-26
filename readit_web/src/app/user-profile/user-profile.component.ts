import {Component, OnInit} from '@angular/core';
import {UserAuthService} from "../user-auth/user-auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'readit-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit {
    username: string = "";

    constructor(
        private userAuthService: UserAuthService,
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient
    ) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe((param) => {
            if (param.has("username")) {
                const username = param.get("username");
                if (!username) {
                    this.router.navigate([""]).then(r => {});
                } else {
                    this.username = username;
                }
            } else {
                this.router.navigate([""]).then(r => {});
            }
        });
    }
}
