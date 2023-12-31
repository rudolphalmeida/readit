import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatInputModule } from "@angular/material/input";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatMenuModule } from "@angular/material/menu";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UserHomeComponent } from "./user/user-home/user-home.component";
import { UserMenuComponent } from "./user/login/user-menu.component";
import { LoginModalComponent } from "./user/login-modal/login-modal.component";
import { TokenInjectInterceptor } from "./utils/token-inject.interceptor";
import { UserProfileComponent } from "./user/user-profile/user-profile.component";
import { AsUsernamePipe } from "./utils/as-username.pipe";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { AsSubreaditPipe } from "./utils/as-subreadit.pipe";
import { MatTabsModule } from "@angular/material/tabs";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatListModule } from "@angular/material/list";
import { SubreaditListComponent } from './subreadits/subreadit-list/subreadit-list.component';
import { NewSubreaditComponent } from './subreadits/new-subreadit/new-subreadit.component';

@NgModule({
    declarations: [
        AppComponent,
        UserHomeComponent,
        UserMenuComponent,
        LoginModalComponent,
        UserProfileComponent,
        AsUsernamePipe,
        PostListComponent,
        AsSubreaditPipe,
        SubreaditListComponent,
        NewSubreaditComponent,
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
        MatTabsModule,
        MatPaginatorModule,
        MatListModule
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInjectInterceptor, multi: true }],
    bootstrap: [AppComponent],
})
export class AppModule {}
