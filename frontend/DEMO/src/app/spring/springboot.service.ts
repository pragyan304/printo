import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Print } from '../home/home/home.model';
import { Client } from '../ClientLogin/clientlogin/Client.model';
import { Admin } from '../login/login/login.model';
import { DatePipe } from '@angular/common';
'Access-Control-Allow-Origin:*';

@Injectable({
  providedIn: 'root'
})
export class SpringbootService {
  constructor(private http:HttpClient) { }


  resetDataBase() {
    return this.http.get<string>("http://localhost:7777/resetdatabase");
  } 
  getClientDateRangeData(sendprintdata: Print) {
    return this.http.post<Print>("http://localhost:7777/getClientDateRangeData",sendprintdata);
  }
  getClientTodayData(pcname: string) {
   return this.http.post<Print>("http://localhost:7777/getClientTodayData",pcname);
  }
  getValidAdmin(data: string) {
    return this.http.post<Admin>("http://localhost:7777/getAdmindata", data);
  }
  getSelectedData(pcname: string) {
    return this.http.post<Print>("http://localhost:7777/getniqueclientdata", pcname);
  }
  getValidClient(id:string) {
    return this.http.post<Client>("http://localhost:7777/getclientdata", id);
  }
  refresh() {
    return this.http.get("http://localhost:7777/refresh");
  }
  getAllAdminData() {
    return this.http.get("http://localhost:7777/getalladmindata");
  }
  getAllClientData() {
    return this.http.get("http://localhost:7777/getallclientdata");
  }
  deleteAdmin(adminDD: Admin) {
    return this.http.post<number>("http://localhost:7777/deleteadmin", adminDD);
  }
  deleteClient(clientd: Client) {
    return this.http.post<number>("http://localhost:7777/deleteclient", clientd);
  }
  addAdminToDB(admind:Admin) {
    return this.http.post<number>("http://localhost:7777/addadmin", admind);
  }
  addClientToDB(clientd:Client) {
    return this.http.post<number>("http://localhost:7777/addclient", clientd);
  }


  public getdata(print: Print) {
    return this.http.post<Print>("http://localhost:7777/ggt", print);
  }
  public downloadFromBackEnd(print: Print) {
    return this.http.post<Print>("http://localhost:7777/download", print);
  }
  grant(){
    
  }
}
