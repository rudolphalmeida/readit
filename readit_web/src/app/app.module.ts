import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { LoginComponent } from './user-auth/login/login.component';
import { LoginModalComponent } from './user-auth/login-modal/login-modal.component';
import {TokenInjectInterceptor} from "./token-inject.interceptor";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AsUsernamePipe } from './as-username.pipe';


registerLocaleData(en);

@NgModule({
    declarations: [
        AppComponent,
        UserHomeComponent,
        LoginComponent,
        LoginModalComponent,
        UserProfileComponent,
        AsUsernamePipe,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        HttpClientModule,
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSnackBarModule,
        MatMenuModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInjectInterceptor, multi: true },
        { provide: NZ_I18N, useValue: en_US },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
