import { Component, OnInit } from '@angular/core';
import { SpringbootService } from 'src/app/spring/springboot.service';
import { Client } from 'src/app/ClientLogin/clientlogin/Client.model';
import { ClientSearch } from './clientsearch.model';
import { Print } from 'src/app/home/home/home.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css']
})
export class ClientPageComponent implements OnInit {
client:Client=new Client();
printData:any
title:string
pcname:string;
status:string;
tempdata:ClientSearch;
sendprintdata:Print=new Print
errmsg:string;
  constructor(private router: Router,private service:SpringbootService) { }

  ngOnInit() {
   this.checkOnLoad();
  }

  checkOnLoad(){
    var id=sessionStorage.getItem("id");
    this.service.getValidClient(id).subscribe(data=>{
      this.client=data;
      if(this.client==null){
        sessionStorage.removeItem('id')
        this.router.navigate(["client"]);
      }
      else{
        this.title="Welcome "+this.client.name;
        this.pcname=this.client.clientpcname;
      }
    });
  }
  
  // show all data
  showData(){
    this.checkOnLoad();
    this.makeempty();
    this.service.getSelectedData(this.pcname).subscribe(data=>{
      this.printData=data;
      if(this.printData==null){
        this.errmsg="Invalid Input/No data Found"
      }
      const userStr = JSON.stringify(this.printData);
            var x=0;
              JSON.parse(userStr, (key, value) => {
                if (key === 'sheet') {
                  x=x+value;
                }});
                if(x==0){
                  this.errmsg="Invalid Input/No data Found"
                  return;
                }
              this.status="Total Number of Pages "+x;
    });
    
  }
  // show date range record
  recordBetweenDate(){
    this.checkOnLoad();
    this.makeempty();
    var x=this.sendprintdata.date
   
    var y=this.sendprintdata.date1
    
    if(this.sendprintdata.date==null||this.sendprintdata.date1==null){
        this.errmsg="Invalid Date"
      return;
    }   
   
    var id=sessionStorage.getItem("id");
    this.service.getValidClient(id).subscribe(data=>{
      this.sendprintdata.username=data.clientpcname;
      this.service.getClientDateRangeData(this.sendprintdata).subscribe(data1=>{
        this.printData=data1;        
        const userStr = JSON.stringify(this.printData);
        var x=0;
          JSON.parse(userStr, (key, value) => {
            if (key === 'sheet') {
              x=x+value;
            }});
          if(x==0){
            this.errmsg="Invalid Input/No data Found"
            return;
          }
          this.status="Total Number of Pages "+x;
      });
    })
   
  
  }
  // show today record
  showToday(){
    this.checkOnLoad();
    this.makeempty();
    var id=sessionStorage.getItem("id");
    this.service.getValidClient(id).subscribe(data=>{
      this.service.getClientTodayData(data.clientpcname).subscribe(data1=>{
        this.printData=data1;
        if(this.printData==null){
          this.errmsg="Invalid Input/No data Found"
        }
        
        const userStr = JSON.stringify(this.printData);
        var x=0;
          JSON.parse(userStr, (key, value) => {
            if (key === 'sheet') {
              x=x+value;
            }});
          if(x==0){
            this.errmsg="Invalid Input/No data Found"
            return;
          }
          this.status="Total Number of Pages "+x;
      });
    })
  }
      //makeempty
      makeempty(){
    this.status=null;
    this.errmsg=null;
      }
}
