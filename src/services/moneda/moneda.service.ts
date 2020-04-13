import { CotizacionModule } from './../../modelos/cotizacion/cotizacion.module';
import { MonedaModule } from '../../modelos/moneda/moneda.module';
import { AuthService } from './../authService/auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {
  constructor(private http: HttpClient , private AuthService: AuthService) { }

  updateImporte(form: FormData){
    return this.http.post<string>(this.AuthService.ruta + `updateImporte/`, form);
  }
  updateCotizacion(form: FormData){
    return this.http.post<string>(`${this.AuthService.ruta}updateCotizacion` , form);
  }
  getMonedas(){ 
    return this.http.get<string>(`${this.AuthService.ruta}getMonedas`);
  }
  getImportes(){ 
    return this.http.get<string>(this.AuthService.ruta + `getImportes/`);
  }
  getNombreMonedas(id_usuario){ 
    var aux = id_usuario.split('"')[1];
    const params = new HttpParams()
      .set('id_usuario', aux.toString());
    return this.http.get<string>(this.AuthService.ruta + `getNombreMonederos/`,{
      params: params , observe: 'response'});
  }
  getIdMonederos(monedero,id_usuario){ 
    const params = new HttpParams()
      .set('id_usuario', id_usuario.toString())
      .set('monedero', monedero.toString());
    return this.http.get<string>(this.AuthService.ruta + `getIdMonederos/`,{
      params: params , observe: 'response'});
  }
  getNombreMonedero(id_monedero : string){ 
    const params = new HttpParams()
      .set('id_monedero', id_monedero);
    return this.http.get<string>(this.AuthService.ruta + `getNombreMonedero/`,{
      params: params , observe: 'response'});
  }
}
