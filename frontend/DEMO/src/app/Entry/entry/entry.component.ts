import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/AdminAuthentication/admin-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

 
  constructor(public loginService:AdminServiceService,private router:Router) { }

  ngOnInit() {
    //admin
    if(sessionStorage.getItem("username")!==null){
      this.router.navigate(['home'])
    }
    ////client
    if(sessionStorage.getItem("id")!==null){
      this.router.navigate(['clientpage'])
    }

  }
  goLogin(){
    this.router.navigate(['login'])
  }
  goClient(){
    this.router.navigate(['client'])
  }

}
