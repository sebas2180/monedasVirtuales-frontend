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
  getImportes(){ 
    return this.http.get<string>(this.ruta + `getImportes/`);
  }
  getNombreMonedas(id_usuario){ 
    var aux = id_usuario.split('"')[1];
    const params = new HttpParams()
      .set('id_usuario', aux.toString());
    return this.http.get<string>(this.ruta + `getNombreMonederos/`,{
      params: params , observe: 'response'});
  }
  getIdMonederos(monedero,id_usuario){ 
    const params = new HttpParams()
      .set('id_usuario', id_usuario.toString())
      .set('monedero', monedero.toString());
    return this.http.get<string>(this.ruta + `getIdMonederos/`,{
      params: params , observe: 'response'});
  }
  getNombreMonedero(id_monedero ){ 
    const params = new HttpParams()
      .set('id_monedero', id_monedero.toString());
    return this.http.get<string>(this.ruta + `getNombreMonedero/`,{
      params: params , observe: 'response'});
  }
}
