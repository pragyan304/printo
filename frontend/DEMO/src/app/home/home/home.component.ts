import { Component, OnInit } from '@angular/core';
import { SpringbootService } from 'src/app/spring/springboot.service';
import { Print } from './home.model';
import { Router } from '@angular/router';
import { Template, Variable } from '@angular/compiler/src/render3/r3_ast';
import { empty } from 'rxjs';
import { NgForOf, DatePipe } from '@angular/common';
import { Admin } from 'src/app/login/login/login.model';
import { LiteralExpr } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  prints:Print=new Print();    
  verifiedAdmin:Admin=new Admin();
  dataprint:Print;
  newobj:Print
  status:string;
  noofprints:string;
  errorStatus:string;
  value:boolean=false;  
  id:string
  newdate:DatePipe;
  count:string;
  msg:string;
  msg1:string;
 
  constructor(private router:Router,private service:SpringbootService) { 
    
   
  }
  ngOnInit() {
    this.checkOnLoad();
  }
  checkOnLoad(){
    this.id=sessionStorage.getItem("username");
    this.service.getValidAdmin(this.id).subscribe(data=>{
      this.verifiedAdmin=data;
      if(this.verifiedAdmin==null||undefined){
        sessionStorage.removeItem("username")
        this.router.navigate(["login"])
      }
    });
  }
  // print report
  getPrint(){
    this.msg=null;
    window.print();
 }
 // generate pdf report
  generateReport(){
    this.refreshDataBase();
    this.msg=null;
    this.errorStatus="";
    this.status="";
    this.count="";
    this.value=false
    var test=/^[a-zA-z0-9-.]+$/;
    
    if((this.prints.username!=undefined)&&(test.test(this.prints.username))){
      if((this.prints.printername!=undefined)&&(test.test(this.prints.printername))){
                
      }
      else{
    this.errorStatus="Invalid Printer Name"
    return;
      }
    }
    else{
      this.errorStatus="Invalid Cleint PC Name"
      return;
  }
    this.checkOnLoad();
    this.value=false
    this.service.downloadFromBackEnd(this.prints)
    .subscribe(data =>this.dataprint=data
    );
    this.msg="Report Is Downloaded"
    }

    // validata inputs
  validate(){
    this.refreshDataBase();
    this.msg=null;
    this.errorStatus="";
    this.status="";
    this.count="";
    this.value=false
    var test=/^[a-zA-z0-9-.]+$/;
    
    if((this.prints.username!=undefined)&&(test.test(this.prints.username))){
      if((this.prints.printername!=undefined)&&(test.test(this.prints.printername))){
        this.showdata();           
      }
      else{
    this.errorStatus="Invalid Printer Name"
      }
    }
    else{
      this.errorStatus="Invalid Cleint PC Name"
  }
  }  
  
  // show data to frontend
  showdata(): void {
    this.checkOnLoad();
     this.service.getdata(this.prints)
        .subscribe(data =>{
          this.dataprint=data;
          const userStr = JSON.stringify(this.dataprint);
            var x=0;
            var y=0;
              JSON.parse(userStr, (key, value) => {
                if (key === 'sheet') {
                 y++;
                  x=x+value;
                }});
              if(y!=0)
              this.count="Total Prints Order Are "+y;
              if(x!=0){
                this.noofprints="Total Number of Pages are "+x;
              this.value=true
              }
              else{
                this.noofprints="Total Number of Pages are "+x;
              this.value=false
              this.status="No Data Found"
              }
        }
        );     
        }
        // refresh database
        refreshDataBase(){
          this.checkOnLoad();
          this.service.refresh().subscribe();
        }

        // make localveriable empty
        makeReset(){
          this.prints.username=null;
          this.prints.printername=null;
          this.prints.date=null;
          this.prints.date1=null;
        }

        // reset database
        resetDataBase(){
          this.checkOnLoad();
          this.service.resetDataBase().subscribe(data=>{
            if(data!=null){
              this.msg1="Database Is Restored"
            }
            else{
              this.msg1="Some Error Occure"
            }

          })
        }
}

  
