import { AuthService } from './../authService/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MonedaService } from './../moneda/moneda.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContratoModule } from 'src/modelos/contrato/contrato.module';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  constructor(private http : HttpClient,
              private AuthService : AuthService) { }
  

  setContrato(form : FormData){
    return this.http.post(`${this.AuthService.ruta}crearContrato`, form);
  }
  activarContrato(id_contrato,id_usuario){
    var params =  new HttpParams()
    .set('id', id_contrato.toString())
    .set('id_usuario', id_usuario.toString());
    return this.http.get(`${this.AuthService.ruta}activarContrato`, {
      params: params , observe: 'response' });
  }
  getContratos( id_usuario ): Observable<ContratoModule>{
    const params = new HttpParams()
    .set('id_usuario', id_usuario.toString());
    return this.http.get<String>(`${this.AuthService.ruta}getContratos`,{ params: params , observe: 'response' } )
    .pipe( map((data => new ContratoModule().deserialize(data))
    )
  )
  }
  registrarPago(form : FormData){
    return this.http.post(`${this.AuthService.ruta}registrarPago`, form);
  }
  getPagos(id_contrato,id_usuario){
    const params = new HttpParams()
    .set('id_contrato', id_contrato.toString())
    .set('id_usuario', id_usuario.toString());
    return this.http.get(`${this.AuthService.ruta}registrarPago`,{
      params: params, observe:'response'
    });
  }
}

