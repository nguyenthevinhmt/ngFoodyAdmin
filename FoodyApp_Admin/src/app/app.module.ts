import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { HttpClientModule } from '@angular/common/http';
import { PromotionComponent } from './promotion/promotion.component';
import { LoginComponent } from './category/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryModalComponent } from './category-modal/category-modal.component';
import { HomeComponent } from './home/home.component';
import { PromotionModalComponent } from './promotion-modal/promotion-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    PromotionComponent,
    LoginComponent,
    CategoryModalComponent,
    HomeComponent,
    PromotionModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    MatButtonModule,
    MatDialogModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    MatSnackBarModule,
    CalendarModule,
    InputSwitchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
