import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserAuthService } from '../user-auth.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.less'],
})
export class LoginModalComponent {
    showPassword: boolean = false;

    username = new FormControl('', [Validators.required]);
    password = new FormControl('', [Validators.required]);

    constructor(
        public dialogRef: MatDialogRef<LoginModalComponent>,
        private userAuthService: UserAuthService,
        private snackBar: MatSnackBar,
    ) {}

    async loginUser() {
        if (!this.username.value || !this.password.value) {
            return;
        }

        await this.userAuthService.login(
            this.username.value,
            this.password.value,
        );

        if (this.userAuthService.isLoggedIn) {
            this.snackBar.open('Logged in successfully', undefined, {
                duration: 3000
            });
            this.dialogRef.close(true);
        } else {
            this.password.setValue('');
            this.snackBar.open('Login failed', undefined, {
                duration: 3000
            });
        }
    }
}
