import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { AboutComponent } from './components/about/about.component';
import { ServiceComponent } from './components/service-page/service.component';
import { UserPriceComponent } from './components/user-price/user-price.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { FooterComponent } from './components/footer/footer.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AddressComponent } from './components/address/address.component';
import { MapComponent } from './components/map/map.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { ImageExampleComponent } from './components/image-example/image-example.component';
import { UserPreviewComponent } from './components/user-preview/user-preview.component';
import { AddServiceComponent } from './components/add-service/add-service.component';
import {MatDialogModule} from "@angular/material/dialog";
import { WarningModuleComponent } from './modals/warning-module/warning-module.component';
import { UserLocationComponent } from './components/user-location/user-location.component';
import { SortingComponent } from './components/sorting/sorting.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { FirstStepComponent } from './components/user-register/first-step/first-step.component';
import { SecondStepComponent } from './components/user-register/second-step/second-step.component';
import { ThirdStepComponent } from './components/user-register/third-step/third-step.component';
import { FourthStepComponent } from './components/user-register/fourth-step/fourth-step.component';
import { FifthStepComponent } from './components/user-register/fifth-step/fifth-step.component';
import { LoadingComponent } from './modals/loading/loading.component';
import {DiscountComponent} from "./components/discount/discount.component";
import { DiscountItemComponent } from './components/discount/discount-item/discount-item.component';
import { AddDiscountComponent } from './components/discount/add-discount/add-discount.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ReviewComponent } from './components/review/review.component';
import { ReviewItemComponent } from './components/review/review-item/review-item.component';
import { StarRatingComponent } from './components/ui/star-rating/star-rating.component';
import { AddReviewComponent } from './components/review/add-review/add-review.component';
import { ModalComponent } from './modals/modal/modal.component';
import { SelectStarsComponent } from './components/ui/select-stars/select-stars.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    AboutComponent,
    ServiceComponent,
    UserPriceComponent,
    UserRegisterComponent,
    FooterComponent,
    AddressComponent,
    MapComponent,
    ProfileComponent,
    LoginComponent,
    ImageExampleComponent,
    UserPreviewComponent,
    AddServiceComponent,
    WarningModuleComponent,
    UserLocationComponent,
    SortingComponent,
    ConfirmEmailComponent,
    FirstStepComponent,
    SecondStepComponent,
    ThirdStepComponent,
    FourthStepComponent,
    FifthStepComponent,
    LoadingComponent,
    DiscountComponent,
    DiscountItemComponent,
    AddDiscountComponent,
    ReviewComponent,
    ReviewItemComponent,
    StarRatingComponent,
    AddReviewComponent,
    ModalComponent,
    SelectStarsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
