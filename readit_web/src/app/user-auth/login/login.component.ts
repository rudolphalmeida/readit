import {Component} from '@angular/core';
import {UserAuthService} from '../user-auth.service';
import {MatDialog} from '@angular/material/dialog';
import {LoginModalComponent} from '../login-modal/login-modal.component';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'readit-login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
})
export class LoginComponent {
    showLoginForm: boolean = false;

    constructor(
        private userAuthService: UserAuthService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
    ) {
    }

    get isLoggedIn(): boolean {
        return this.userAuthService.isLoggedIn;
    }

    get username(): string | null {
        return  this.userAuthService.loggedInUserName;
    }

    openLoginDialog(): void {
        const dialogRef = this.dialog.open(LoginModalComponent, {});
        dialogRef
            .afterClosed()
            .subscribe((_loggedIn: boolean) => {
            });
    }

    async logoutUser() {
        await this.userAuthService.logout();
        this.snackBar.open('Logged out successfully', undefined, {
            duration: 3000
        });
    }
}
