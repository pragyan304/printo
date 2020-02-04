import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login/login.component';
import { LogoutComponent } from './logout/logout/logout.component';
import { AdminComponent } from './adminthing/admin/admin.component';
import { AdminGaurdService } from './AdminGaurd/admin-gaurd.service';
import { ClientloginComponent } from './ClientLogin/clientlogin/clientlogin.component';
import { EntryComponent } from './Entry/entry/entry.component';
import { ClientPageComponent } from './ClientDashBoard/client-page/client-page.component';
import { MixGaurdService } from './MixGaurd/mix-gaurd.service';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: '',
    component:EntryComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component:HomeComponent,
    canActivate:[AdminGaurdService]
  },
  {
    path: 'logout',
    component:LogoutComponent,
    canActivate:[MixGaurdService]
  },
  {
    path: 'client',
    pathMatch: 'full',
    component: ClientloginComponent,
  },
  {
    path: 'admin',
    pathMatch: 'full',
    component: AdminComponent,
    canActivate:[AdminGaurdService]
  },

  {
    path: 'clientpage',
    pathMatch: 'full',
    component: ClientPageComponent,
    canActivate:[MixGaurdService]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
