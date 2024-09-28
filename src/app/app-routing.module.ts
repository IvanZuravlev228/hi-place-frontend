import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {AboutComponent} from "./components/about/about.component";
import {ServiceComponent} from "./components/service-page/service.component";
import {UserRegisterComponent} from "./components/user-register/user-register.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {AddServiceComponent} from "./components/add-service/add-service.component";
import {FooterComponent} from "./components/footer/footer.component";
import {ConfirmEmailComponent} from "./components/confirm-email/confirm-email.component";
import {LoginComponent} from "./components/login/login.component";
import {DiscountComponent} from "./components/discount/discount.component";

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'home', component: MainComponent},
  {path: 'about', component: AboutComponent},
  {path: 'services', component: ServiceComponent},
  {path: 'user/auth/register', component: UserRegisterComponent},
  {path: 'user/auth/login', component: LoginComponent},
  {path: 'user/profile', component: ProfileComponent},
  {path: 'services/add', component: AddServiceComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'confirm-email', component: ConfirmEmailComponent},
  {path: 'discounts', component: DiscountComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
