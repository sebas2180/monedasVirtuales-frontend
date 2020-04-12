import { AuthService } from './../authService/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(
              private AuthService: AuthService
            ) { }
  intercept( req, next ) {
     
    var tokinazeReq;
    if(this.AuthService.getLocal()){
       tokinazeReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.AuthService.getToken()} ${this.AuthService.getLocal()}`
        }
      });
    }else{
      tokinazeReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.AuthService.getToken()}`
        }
      });
  }
    return next.handle(tokinazeReq);
}
}