import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/AdminAuthentication/admin-service.service';
import { ClientAuthenticationService } from 'src/app/ClientAuthentication/client-authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authentocationService:AdminServiceService,
    private clientAuth:ClientAuthenticationService,
    private router:Router) { }

  ngOnInit() {
    
    this.clientAuth.logOut();
    this.authentocationService.logOut();
    this.router.navigate([''])
  }


}
