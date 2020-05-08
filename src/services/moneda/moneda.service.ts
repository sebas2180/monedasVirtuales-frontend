import { map } from 'rxjs/operators';
import { CotizacionModule } from './../../modelos/cotizacion/cotizacion.module';
import { EstadisticasMonedasModule } from './../../modelos/estadisticas-monedas/estadisticas-monedas.module';
import { MonedaModule } from '../../modelos/moneda/moneda.module';
import { AuthService } from './../authService/auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {
  constructor(private http: HttpClient , private AuthService: AuthService) { }

  updateImporte(form: FormData){
    return this.http.post<string>(this.AuthService.ruta + `updateImporte/`, form);
  }
  transferenciaSaldo(form: FormData){
    return this.http.post<string>(this.AuthService.ruta + `transferenciaSaldo`, form);
  }
  updateCotizacion(form: FormData){
    return this.http.post<string>(`${this.AuthService.ruta}updateCotizacion` , form);
  }
  addMoneda(form: FormData){
    console.log('______________________ ADD moneda _______________________________')
    return this.http.post<string>(`${this.AuthService.ruta}addMoneda` , form);
  }
  getMonedas(){ 
    return this.http.get<string>(`${this.AuthService.ruta}getMonedas`);
  }
  getMoneda(id_usuario : string , nombre_moneda : string , nombre_monedero : string ) : Observable<MonedaModule> { 
    var params = new HttpParams()
    .set('id_usuario' , id_usuario)
    .set('nombre_moneda',nombre_moneda)
    .set('nombre_monedero',nombre_monedero);
    return this.http.get<string>(`${this.AuthService.ruta}getMoneda`,
    { params : params , observe: 'response'} ).pipe( map((data => new MonedaModule().deserialize(data))
    )
  )
  }
  getImportes(){ 
    return this.http.get<string>(this.AuthService.ruta + `getImportes/`);
  }
  getNombreMonedas( id_usuario , nombre_moneda ) {
    var aux = id_usuario.split('"')[1];
    console.log(nombre_moneda);
    const params = new HttpParams()
      .set('nombre_moneda', nombre_moneda.toString())
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
      params: params});
  }

  getEstadisticasTransacciones(id_usuario : string){ 
    const params = new HttpParams()
      .set('id_usuario', id_usuario);
      console.log('GET ESTADISTICAS TRANSACCIONES')
    return this.http.get<string>(this.AuthService.ruta + `getEstadisticasTransacciones/`,{
      params: params , observe: 'response' })
      .pipe( map((data => new EstadisticasMonedasModule().deserialize(data))
      )
    )
  }
}
