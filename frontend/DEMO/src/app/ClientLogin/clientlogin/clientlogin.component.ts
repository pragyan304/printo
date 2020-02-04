import { Component, OnInit } from '@angular/core';
import { ClientAuthenticationService } from 'src/app/ClientAuthentication/client-authentication.service';
import { Router } from '@angular/router';
import { Client } from './Client.model';

@Component({
  selector: 'app-clientlogin',
  templateUrl: './clientlogin.component.html',
  styleUrls: ['./clientlogin.component.css']
})
export class ClientloginComponent implements OnInit {
  client:Client=new Client();
  invalidLogin = false
  client1:Client
  erroru:any;
  errorp:any;
  status:any;
  constructor(private router:Router,
    private loginservice:ClientAuthenticationService) { }

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

  makeRun(){
    this.errorp=null;
    this.erroru=null;
    this.status=null;
  }

  // check login
  checkLogin() {
    if((this.client.id==undefined||"")&&(this.client.password==undefined||"")){
      this.makeRun();
      this.erroru="Enter the Username";
      this.errorp="Enter the Password";
      return;
    }
    this.makeRun();
    if(this.client.id==undefined||this.client.id==""){
      this.erroru="Enter the Username";
      if(this.client.password==undefined||this.client.password==""){
        this.errorp="Enter the Password";
        return;
       }
      return;
    }
    else{
      this.makeRun();
     if(this.client.password==undefined||this.client.password==""){
      this.errorp="Enter the Password";
      return;
     }
    }
    this.loginservice.authenticate(this.client).subscribe((data: Client)=>{
      this.client1=data
      if(this.client1!==null){
        this.loginservice.setSession(this.client);
        this.router.navigate(['clientpage'])
    }
      else{
        this.invalidLogin = true
        this.status="Username And Password are not Found"
      }
    });
  }
  // go back
  goBack(){
    this.router.navigate([''])
  }
}
