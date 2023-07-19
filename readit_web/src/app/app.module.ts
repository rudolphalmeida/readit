import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserHomeComponent } from './user-home/user-home.component';
import { LoginComponent } from './user-auth/login/login.component';
import { LoginModalComponent } from './user-auth/login-modal/login-modal.component';

@NgModule({
    declarations: [
        AppComponent,
        UserHomeComponent,
        LoginComponent,
        LoginModalComponent,
    ],
    imports: [
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
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
