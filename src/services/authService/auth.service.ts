import { Observable } from 'rxjs';
import { MonedaService } from './../moneda/moneda.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public ruta :string  = `http://localhost:3000/`;
  //public ruta :string  = `https://backend-crypto.herokuapp.com/`;

  constructor(private http: HttpClient, private route : Router) { }

  public clearLocalStorage(){
    localStorage.removeItem('userInfo');
    localStorage.removeItem('access-token');
    this.getLocal();
  }
  public getLocal(){
    return localStorage.getItem('userInfo');
  }

  public getToken(){
    return localStorage.getItem('access-token');
  }
  public comprobar() {
    return this.http.get(`${this.ruta}verificarToken` );
      // return !!localStorage.getItem('access-token');
    }
    public isAuthenticatede() : Boolean {
      let userData = localStorage.getItem('userInfo');
      let token =  localStorage.getItem('access-token');
     // console.log(token+'   '+userData);
      if(userData != null && token != null){
        return true;
      }
      return false;
    }
  public setUserInfo(user, token){
    localStorage.setItem('userInfo', JSON.stringify(user));
    localStorage.setItem('access-token', JSON.stringify(token));
  }
  
}
