import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {

  // ruta :string  = `http://localhost:3000/`;
  ruta :string  = `https://backend-crypto.herokuapp.com/`;
  constructor(private http: HttpClient) { }

  updateImporte(form: FormData){
    return this.http.post<string>(this.ruta + `updateImporte/`, form);
  }
  updateCotizacion(form: FormData){
    return this.http.post<string>(this.ruta + `updateCotizacion/`, form);
  }
}
