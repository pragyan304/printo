import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../ClientLogin/clientlogin/Client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientAuthenticationService {

  constructor(private http:HttpClient) { }
  public authenticate(user: Client): any{   
    return this.http.post<Client>("http://localhost:7777/xyz", user);
  }
  setSession(client:Client){
    sessionStorage.setItem('id',client.id)
  }
  isClientLoggedIn() {
    let admin = sessionStorage.getItem('id')
    return !(admin === null)
  }
  logOut() {
    sessionStorage.removeItem('id')
  }
}
