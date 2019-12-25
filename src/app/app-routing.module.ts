
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AdsComponent } from './components/ads/ads.component';
import { AddAdComponent } from './components/add-ad/add-ad.component';
import { AuthGuard } from './services/auth.guard';
import { MyAdsComponent } from './components/my-ads/my-ads.component';




const routes: Routes = [
    { path: '', component: AdsComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'addad', component: AddAdComponent, canActivate: [AuthGuard] },
    { path: 'myads', component: MyAdsComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}