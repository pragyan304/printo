import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/AdminAuthentication/admin-service.service';
import { ClientAuthenticationService } from 'src/app/ClientAuthentication/client-authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn:boolean = false;
  isClientLoggedIn:boolean=false;
  constructor(public loginService:AdminServiceService,
    public loginServiceClient:ClientAuthenticationService) { }

  ngOnInit() {
    this.isUserLoggedIn=this.loginService.isUserLoggedIn();
    this.isClientLoggedIn=this.loginServiceClient.isClientLoggedIn();
  }

}
