import { map } from 'rxjs/operators';
import { CotizacionModule } from './../../modelos/cotizacion/cotizacion.module';
import { MonedaService } from './../moneda/moneda.service';
import { AuthService } from './../authService/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  private bit2meEURBTC  = new BehaviorSubject<CotizacionModule>(new CotizacionModule);
  private bit2meEURETH  = new BehaviorSubject<CotizacionModule>(new CotizacionModule);
  private bit2meEURLTC  = new BehaviorSubject<CotizacionModule>(new CotizacionModule);

  private bitstampUSDBTC  = new BehaviorSubject<CotizacionModule>(new CotizacionModule);

  private argenbtcARSBTC  = new BehaviorSubject<CotizacionModule>(new CotizacionModule);

  private satoshitangoARSETH  = new BehaviorSubject<CotizacionModule>(new CotizacionModule);
  private satoshitangoARSLTC  = new BehaviorSubject<CotizacionModule>(new CotizacionModule);

  private coinbaseUSDETH  = new BehaviorSubject<CotizacionModule>(new CotizacionModule);

  private decryptoARSBTC = new BehaviorSubject<CotizacionModule>(new CotizacionModule);
  private decryptoUSDBTC = new BehaviorSubject<CotizacionModule>(new CotizacionModule);
  private CryptoMrkARSETH = new BehaviorSubject<CotizacionModule>(new CotizacionModule);
  public  cotizacionesUSDBTC : CotizacionModule[] =[];
  public cotizacionesEURBTC : CotizacionModule[] =[];
  public cotizacionesARSBTC : CotizacionModule[] =[];
  public cotizacionesUSDETH : CotizacionModule[] =[];
  public cotizacionesEURETH : CotizacionModule[] =[];
  public cotizacionesARSETH : CotizacionModule[] =[];
  public cotizacionesARSLTC : CotizacionModule[] =[];
  public cotizacionesEURLTC : CotizacionModule[] =[];
  public cotizacionesUSDLTC : CotizacionModule[] =[];
 
  constructor(private http: HttpClient, private AuthService: AuthService,private m: MonedaService) { }

  public Cbit2meEURBTC = this.bit2meEURBTC.asObservable();
  public Cbit2meEURLTC = this.bit2meEURLTC.asObservable();
  public Cbit2meEURETH = this.bit2meEURETH.asObservable();

  
  public CbitstampUSDBTC = this.bitstampUSDBTC.asObservable();
  public CargenbtcARSBTC = this.argenbtcARSBTC.asObservable();

  public CsatoshitangoARSETH = this.satoshitangoARSETH.asObservable();
  public CsatoshitangoARSLTC = this.satoshitangoARSLTC.asObservable();

  public CcoinbaseUSDETH = this.coinbaseUSDETH.asObservable();

  public CdecryptoUSDBTC = this.decryptoUSDBTC.asObservable();
  public CdecryptoARSBTC = this.decryptoARSBTC.asObservable();

  public CcryptomrkETHARS = this.CryptoMrkARSETH.asObservable();

  public changeBit2meEURBTC(cotizacion: CotizacionModule):void{
    this.bit2meEURBTC.next(cotizacion);
  }
  public changeBit2meEURETH(cotizacion: CotizacionModule):void{
    this.bit2meEURETH.next(cotizacion);
  }
  public changeCoinbaseUSDETH(cotizacion: CotizacionModule):void{
    this.coinbaseUSDETH.next(cotizacion);
  }
  public changeBit2meEURLTC(cotizacion: CotizacionModule):void{
    this.bit2meEURLTC.next(cotizacion);
  }
  public changeBitstampUSDBTC(cotizacion: CotizacionModule):void{
    this.bitstampUSDBTC.next(cotizacion);
  }
  public changeArgenbtcARSBTC(cotizacion: CotizacionModule):void{
    this.argenbtcARSBTC.next(cotizacion);
  }
  public changeSatoshitangoARSETH(cotizacion: CotizacionModule):void{
    this.satoshitangoARSETH.next(cotizacion);
  }
  public changeCryptomktARSETH(cotizacion: CotizacionModule):void{
    this.CryptoMrkARSETH.next(cotizacion);
  }
  public changeSatoshitangoARSLTC(cotizacion: CotizacionModule):void{
    this.satoshitangoARSLTC.next(cotizacion);
  }
  public changDecryptoUSDBTC(cotizacion: CotizacionModule):void{
    this.decryptoUSDBTC.next(cotizacion);
  }
  public changDecryptoARSBTC(cotizacion: CotizacionModule):void{
    this.decryptoARSBTC.next(cotizacion);
  }
  getCotizaciones(){
    return this.http.get(`${this.AuthService.ruta_cotizaciones}getCotizaciones`);
  }
  getCotizacionesV2(){
    return this.http.get(`${this.AuthService.ruta_cotizaciones}getCotizacionesV2`,{ observe:'response' })
    .pipe( map((data => new CotizacionModule().deserialize(data))
    )
  )
  
  }
  getCotizacionParaMonedero(){
    return this.http.get(`${this.AuthService.ruta_cotizaciones}getCotizacionParaMonedero`);
  }
}
