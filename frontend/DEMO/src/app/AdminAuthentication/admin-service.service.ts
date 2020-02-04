import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../login/login/login.model';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  saveAdmin(adm: Admin) {
    return this.http.post<Admin>("http://localhost:7777/addadmin", adm);
  }
    
  constructor(private http:HttpClient) { }
  checkAdminIsEmpty() {
   return this.http.get<number>("http://localhost:7777/check");
  }
  public authenticate(user: Admin): any{   
    return this.http.post<Admin>("http://localhost:7777/abc", user);
  }
  setSession(admin:Admin){
    sessionStorage.setItem('username',admin.id)
  }
  isUserLoggedIn() {
    let admin = sessionStorage.getItem('username')
    //console.log(!(user === null))
    return !(admin === null)
  }
  logOut() {
    sessionStorage.removeItem('username')
  }
}
