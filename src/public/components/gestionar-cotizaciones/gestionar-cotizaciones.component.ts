import { CotizacionService } from './../../../services/cotizacion/cotizacion.service';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/authService/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { CotizacionModule } from 'src/modelos/cotizacion/cotizacion.module';

@Component({
  selector: 'app-gestionar-cotizaciones',
  templateUrl: './gestionar-cotizaciones.component.html',
  styleUrls: ['./gestionar-cotizaciones.component.scss']
})
export class GestionarCotizacionesComponent implements OnInit {
 
  isPrincipal: boolean = false;
  isLogeado: boolean = false;
  verMenu: boolean = false;
  isOkBTCARS:boolean =false;
  isOkBTCUSD:boolean =false;
  isOkETHARS:boolean =false;
  isOkETHUSD:boolean =false;
  cotizacionesBTCARS : CotizacionModule[] ;
  cotizacionesETHARS : CotizacionModule[] ;
  cotizacionesETHUSD : CotizacionModule[] ;
  cotizacionesBTCUSD : CotizacionModule[] ;
  constructor(public AuthService : AuthService,
              private route: Router,
              private CotizacionService : CotizacionService
  ) { 
    if ( this.AuthService.isAuthenticatede() ) {
      this.isPrincipal = false;
      this.isLogeado = true;
      this.verMenu = false;

      this.CotizacionService.getCotizacionesV2().subscribe(
        res => {
          this.cotizacionesBTCARS = res['BTCARS'] ;
          this.isOkBTCARS=true;

          this.cotizacionesETHARS = res['ETHARS'] ;
          this.isOkETHARS=true;

          this.cotizacionesETHUSD = res['ETHUSD'] ;
          this.isOkETHUSD=true;

          this.cotizacionesBTCUSD = res['BTCUSD'] ;
          this.isOkBTCUSD=true;
          console.log(  this.cotizacionesBTCARS )
           
        },error => {
          console.log(error);
        }
      )
     } else {
      this.route.navigate(['/pantallaprincipal']);
    }
  }

  ngOnInit(): void {
  }
  cerrar_menu(){
    this.verMenu = false;
  }
  changeVerMenu(e) {
  if(this.verMenu){
    this.verMenu = false;
  } else {
    this.verMenu = true;
  }
  }
  changeIsPrincipal(e){
    
  }
}
