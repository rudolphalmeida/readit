import {Component} from '@angular/core';
import {UserAuthService} from '../user-auth.service';
import {MatDialog} from '@angular/material/dialog';
import {LoginModalComponent} from '../login-modal/login-modal.component';
import {MatSnackBar} from "@angular/material/snack-bar";
import {NewSubreaditComponent} from "../../subreadits/new-subreadit/new-subreadit.component";

@Component({
    selector: 'readit-login-component',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.less'],
})
export class UserMenuComponent {
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
        return this.userAuthService.loggedInUserName;
    }

    openLoginDialog(): void {
        const dialogRef = this.dialog.open(LoginModalComponent, {});
        dialogRef
            .afterClosed()
            .subscribe(_ => {
            });
    }

    async logoutUser() {
        await this.userAuthService.logout();
        this.snackBar.open('Logged out successfully', undefined, {
            duration: 3000
        });
    }

    createNewSubreadit() {
        const dialogRef = this.dialog.open(NewSubreaditComponent, {});
        dialogRef.afterClosed().subscribe(_ => {
        });
    }
}
