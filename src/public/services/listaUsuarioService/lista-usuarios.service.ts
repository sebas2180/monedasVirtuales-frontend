import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListaUsuariosService {

  constructor(private http: HttpClient) {


  }
  getUsuario(){
      return this.http.get(`https://backend-crypto.herokuapp.com/`);
  }
}
