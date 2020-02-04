import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from './login.model';
import { AdminServiceService } from 'src/app/AdminAuthentication/admin-service.service';
import { Template } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 user:Admin=new Admin();
 adm:Admin=new Admin();
 invalidLogin = false
 user1:Admin
 erroru:any;
 errorp:any;
 status:any;


  constructor(private router:Router,
    private loginservice:AdminServiceService) { 
    }
  ngOnInit() {
    this.adm.name="pragyan"
    this.adm.id="root";
    this.adm.password="root";
  this.loginservice.checkAdminIsEmpty().subscribe(data=>{
    if(data===0){
      this.loginservice.saveAdmin(this.adm).subscribe()
    }else{
      return;
    }
  });

  //admin
  if(sessionStorage.getItem("username")!==null){
    this.router.navigate(['/home'])
  }
  ////client
  if(sessionStorage.getItem("id")!==null){
    this.router.navigate(['/clientpage'])
  }
 
  }
 
  //  make localvariable empty
  makeRun(){
    this.errorp=null;
    this.erroru=null;
    this.status=null;
  }

  // check admin login validation
  checkLogin() {
    if((this.user.id==undefined||"")&&(this.user.password==undefined||"")){
      this.makeRun();
      this.erroru="Enter the Username";
      this.errorp="Enter the Password";
      return;
    }
    this.makeRun();
    if(this.user.id==undefined||this.user.id==""){
      this.erroru="Enter the Username";
      if(this.user.password==undefined||this.user.password==""){
        this.errorp="Enter the Password";
        return;
       }
      return;
    }
    else{
      this.makeRun();
     if(this.user.password==undefined||this.user.password==""){
      this.errorp="Enter the Password";
      return;
     }
    }
    this.loginservice.authenticate(this.user).subscribe((data: Admin)=>{
      this.user1=data
      if(this.user1!==null){
       this.loginservice.setSession(this.user)
      this.router.navigate(['home'])
      
    }
      else{
        this.invalidLogin = true
        this.status="Username And Password are not Found"
      }
    });
  }


  // for go back
    goBack(){
      this.router.navigate([''])
    }
}
