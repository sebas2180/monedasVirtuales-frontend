import { AuthService } from './../authService/auth.service';
import { MonedaService } from './../moneda/moneda.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient,private m: MonedaService,private AuthService: AuthService) { 
  }
  login(form: FormData){
    console.log('login');
    return this.http.post(this.AuthService.ruta+`login/`,form);
  }
  logout(form: FormData){
    this.AuthService.clearLocalStorage();
    return this.http.post(this.AuthService.ruta+`logout/`,form);
  }
  signup(form: FormData){
    console.log('signup service');
    return this.http.post(this.AuthService.ruta+`signup/`,form);
  }
  getUsuarios(){
    return this.http.get(this.AuthService.ruta+`getUsuarios/`);
}
}
