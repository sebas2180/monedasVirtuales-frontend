import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {
  constructor(private http: HttpClient) { }

  //public ruta :string  = `http://localhost:3000/`;
  public ruta :string  = `https://backend-crypto.herokuapp.com/`;

  updateImporte(form: FormData){
    return this.http.post<string>(this.ruta + `updateImporte/`, form);
  }
  updateCotizacion(form: FormData){
    return this.http.post<string>(this.ruta + `updateCotizacion/`, form);
  }
  getMonedas(){
    return this.http.get<string>(this.ruta + `getMonedas/`);
  }
}
