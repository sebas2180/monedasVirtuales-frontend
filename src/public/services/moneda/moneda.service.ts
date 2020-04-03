import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {

  constructor(private http: HttpClient) { }

  updateImporte(form: FormData){
    return this.http.post<string>(`http://localhost:3000/updateImporte/`,form);
  }
  updateCotizacion(form: FormData){
    return this.http.post<string>(`http://localhost:3000/updateCotizacion/`,form);
  }
}
