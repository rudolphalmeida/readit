import { Component, OnInit } from "@angular/core";
import { UserAuthService } from "../user-auth/user-auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { apiUrl } from "../utils/api-util";
import { User } from "../user-auth/user-auth";

@Component({
    selector: "readit-user-profile",
    templateUrl: "./user-profile.component.html",
    styleUrls: ["./user-profile.component.less"],
})
export class UserProfileComponent implements OnInit {
    username: string = "";
    user_details: User | null = null;

    constructor(
        private userAuthService: UserAuthService,
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((param) => {
            if (param.has("username")) {
                const username = param.get("username");
                if (!username) {
                    this.router.navigate([""]).then((r) => {});
                } else {
                    this.username = username;
                    this.loadUserProfile().then((_) => {});
                }
            } else {
                this.router.navigate([""]).then((r) => {});
            }
        });
    }

    async loadUserProfile() {
        if (!this.username) {
            return;
        }

        this.user_details = (await firstValueFrom(
            this.http.get(apiUrl(`users/${this.username}`), { withCredentials: true }),
        )) as User;
    }
}
