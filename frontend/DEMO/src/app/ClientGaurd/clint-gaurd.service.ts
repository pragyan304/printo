import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ClientAuthenticationService } from '../ClientAuthentication/client-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ClintGaurdService implements CanActivate{
  constructor(private router: Router,
    private clientAuthService:ClientAuthenticationService) { }

  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean  {
    if (this.clientAuthService.isClientLoggedIn())
    return true;
else{
  this.router.navigate(['']);
  return false;
  }
}
}
