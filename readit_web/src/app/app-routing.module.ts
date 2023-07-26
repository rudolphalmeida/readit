import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserHomeComponent} from './user-home/user-home.component';
import {UserProfileComponent} from "./user-profile/user-profile.component";

const routes: Routes = [
    {path: '', component: UserHomeComponent},
    {path: 'u/:username', component: UserProfileComponent},
    {path: '**', component: UserHomeComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
