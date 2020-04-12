 
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '.././authService/auth.service';
@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor( 
              private AuthService: AuthService,
              private Router: Router
              ){

  }
  canActivate() :boolean{
    console.log('canActivated: '+ this.AuthService.isAuthenticatede())
    if(this.AuthService.isAuthenticatede()){
      return true;
    }
    this.Router.navigate(['/pantallaprincipal']);
  }
}
