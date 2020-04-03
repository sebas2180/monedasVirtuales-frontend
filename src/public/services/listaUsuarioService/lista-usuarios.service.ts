import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListaUsuariosService {

   // ruta :string  = `http://localhost:3000/`;
   ruta :string  = `https://backend-crypto.herokuapp.com/`;
  constructor(private http: HttpClient) {


  }
  getUsuario(){
      return this.http.get(this.ruta);
  }
}
