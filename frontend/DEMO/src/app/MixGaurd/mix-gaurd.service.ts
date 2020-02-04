import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad } from '@angular/router';
import { ClientAuthenticationService } from '../ClientAuthentication/client-authentication.service';
import { AdminServiceService } from '../AdminAuthentication/admin-service.service';

@Injectable({
  providedIn: 'root'
})
export class MixGaurdService implements CanActivate{
  
  constructor(private router: Router,private authService: AdminServiceService,
    private clientAuthService:ClientAuthenticationService) { }

  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean  {
    if (this.authService.isUserLoggedIn()||this.clientAuthService.isClientLoggedIn())
    return true;
else{
  this.router.navigate(['']);
  return false;
  }
}
}
