import { MonedaService } from './../moneda/moneda.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient,private m: MonedaService) { 
  }
  login(form: FormData){
    return this.http.post(this.m.ruta+`login/`,form);
  }
  getUsuarios(){
    return this.http.get(this.m.ruta+`getUsuarios/`);
}
}
