import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login/login.component';
import { LogoutComponent } from './logout/logout/logout.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './adminthing/admin/admin.component';
import { AdminGaurdService } from './AdminGaurd/admin-gaurd.service';
import { ClientloginComponent } from './ClientLogin/clientlogin/clientlogin.component';
import { EntryComponent } from './Entry/entry/entry.component';
import { ClientPageComponent } from './ClientDashBoard/client-page/client-page.component';
import { SpringbootService } from './spring/springboot.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ClientPageComponent,
    ClientloginComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    EntryComponent,
    AdminComponent,
    ClientloginComponent,
    EntryComponent,
    ClientPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AdminGaurdService,SpringbootService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
