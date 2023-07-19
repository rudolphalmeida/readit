import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserAuthService } from '../user-auth.service';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.less'],
})
export class LoginModalComponent {
    showPassword: boolean = false;

    username: string = '';
    password: string = '';

    constructor(
        public dialogRef: MatDialogRef<LoginModalComponent>,
        private userAuthService: UserAuthService,
    ) {}

    loginUser() {
        if (!this.username) {
            // TODO: Show username hint
        }

        if (!this.password) {
            // TODO: Show password hint
        }

        if (!this.username || !this.password) {
            return;
        }

        this.userAuthService.login(this.username, this.password);
    }
}
