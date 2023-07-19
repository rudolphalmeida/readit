import { Component } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../login-modal/login-modal.component';

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
    ) {}

    get isLoggedIn(): boolean {
        return this.userAuthService.isLoggedIn;
    }

    openLoginDialog(): void {
        const dialogRef = this.dialog.open(LoginModalComponent, {});
        dialogRef
            .afterClosed()
            .subscribe((something) => console.log(something));
    }
}
