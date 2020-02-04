import { Component, OnInit } from '@angular/core';
import { SpringbootService } from 'src/app/spring/springboot.service';
import { Admin } from 'src/app/login/login/login.model';
import { Router } from '@angular/router';
import { Client } from 'src/app/ClientLogin/clientlogin/Client.model';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  clientd:Client=new Client();
  clientDD:Client=new Client();
  status:number;
  title:String;
  titleA:String;
  admind:Admin=new Admin();
  adminDD:Admin=new Admin();
  clientshow:any;
  adminshow:any;
  valueadmin:boolean=false;
  valueclient:boolean=false;
  constructor(private router:Router,private service:SpringbootService) { }

  ngOnInit() {
  }


  // make Empty Client
  makeEmptyClient(){
      this.clientd.id="";
      this.clientd.password="";
      this.clientd.repassword="";
      this.clientd.name="";
      this.clientd.clientpcname="";
  }

  // check Client Empty
  checkClientEmpty(){
    if(this.clientd.id==null&&this.clientd.name==null&&this.clientd.password==null&&this.clientd.clientpcname==null){
      {
        this.title="Fill All the Details";
        return false;
      }
    }else{
      return true;
    }
  }

  // validate Client
  validateClient(){
    if(this.clientd.password===this.clientd.repassword){
     return true;
    }
    else{
      this.title="Password Does not match";
      this.clientd.password="";
      this.clientd.repassword="";
      return false;
    }
  }

  // add Client
  addClient(){
   this.titleA=null;
    if(this.checkClientEmpty()==false)
      return ;
    if(this.validateClient()==false)
      return;
      var test=/^[a-zA-z0-9-.]+/;
    
      if(test.test(this.clientd.clientpcname)&&test.test(this.clientd.id)&&test.test(this.clientd.name)&&test.test(this.clientd.password)&&test.test(this.clientd.repassword)){
       
      }
      else{
        this.title="Invalid Credentials";
        return;
      }
     
           this.service.addClientToDB(this.clientd)
        .subscribe(data=>{
          this.status=data;
          if(this.status!==0)
            {
             this.title="Inserted Succesfully";
             this.makeEmptyClient();
            }
            else{

              this.title="Wrong Details"
             this.makeEmptyClient();
            }
        });     
  }
  //  make Empty Admin
   makeEmptyAdmin(){
    this.admind.id="";
    this.admind.password="";
    this.admind.repassword="";
    this.admind.name="";
}
// check Admin Empty
checkAdminEmpty(){
  if(this.admind.id==null&&this.admind.name==null,this.admind.password==null){
    {
      this.titleA="Fill All the Details";
      return false;
    }
  }else{
    return true;
  }
}
// validate admin
validateAdmin(){
  if(this.admind.password===this.admind.repassword){
   return true;
  }
  else{
    this.titleA="Password Does not match";
    this.admind.password="";
    this.admind.repassword=""
    return false;
  }
}
// add admin
  addAdmin(){
   this.title=null;
    if(this.checkAdminEmpty()===false)
      return ;
    if(this.validateAdmin()===false)
      return;
      var test=/^[a-zA-z0-9-.]+/;
      if(test.test(this.admind.id)&&test.test(this.admind.name)&&test.test(this.admind.password)&&test.test(this.admind.repassword)){
       
      }
      else{
        this.titleA="Invalid Credentials";
        return;
      }
           this.service.addAdminToDB(this.admind)
        .subscribe(data=>{
          this.status=data;
          if(this.status!==0)
            {
             this.titleA="Inserted Succesfully";
             this.makeEmptyAdmin();
            }
            else{

              this.titleA="Wrong Details"
             this.makeEmptyAdmin();
            }
        });     
  }
// get all client
  getAllClient(){
    this.valueadmin=false;
    this.valueclient=false;
    this.title=null;
    this.titleA=null;
    this.service.getAllClientData().subscribe(data=>{
      this.clientshow=data;
      if(this.clientshow!=null){
        this.valueclient=true;
      }
    });
  }
  //get All Admin
  getAllAdmin(){
    this.valueadmin=false;
    this.valueclient=false;
    this.title=null;
    this.titleA=null;
    this.service.getAllAdminData().subscribe(data=>{
      this.adminshow=data
      if(this.adminshow!=null){
        this.valueadmin=true;
      }
    });
  }
  // delete Admin
  deleteAdmin(aid:string){
    this.adminDD.id=aid;
    this.service.deleteAdmin(this.adminDD).subscribe();
    this.adminshow=null;
    this.getAllAdmin();
  }
  // delect client
  deleteClient(cid:string){
    this.clientDD.id=cid;
    this.service.deleteClient(this.clientDD).subscribe();
    this.clientshow=null;
    this.getAllClient();
  }
}
