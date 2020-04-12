import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

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
  public isAuthenticatede() : Boolean {
      return !!localStorage.getItem('access-token');
    }
  
  public setUserInfo(user, token){
    localStorage.setItem('userInfo', JSON.stringify(user));
    localStorage.setItem('access-token', JSON.stringify(token));
  }
  
}
