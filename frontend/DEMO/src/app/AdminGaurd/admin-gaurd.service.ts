import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AdminServiceService } from '../AdminAuthentication/admin-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGaurdService implements CanActivate{
  constructor(private router: Router,
    private authService: AdminServiceService) { }

  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean  {
    if (this.authService.isUserLoggedIn()){
    return true;
    }
else{
  this.router.navigate(['']);

  return false;
  }
}
}
