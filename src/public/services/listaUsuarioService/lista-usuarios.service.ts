import { MonedaService } from './../moneda/moneda.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListaUsuariosService {

 
  constructor(private http: HttpClient,private m: MonedaService) {


  }
  getUsuario(){
      return this.http.get(this.m.ruta);
  }
}
