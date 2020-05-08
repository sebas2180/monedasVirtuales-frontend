import { MonedaService } from './../../../services/moneda/moneda.service';
import { CotizacionModule } from './../../../modelos/cotizacion/cotizacion.module';
import { CotizacionService } from './../../../services/cotizacion/cotizacion.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'lista-cotizaciones',
  templateUrl: './lista-cotizaciones.component.html',
  styleUrls: ['./lista-cotizaciones.component.scss']
})
export class ListaCotizacionesComponent implements OnInit {
  @Input() cancel_subsc  : boolean;
  cotizacionesUSDBTC : CotizacionModule[] =[];
  cotizacionesEURBTC : CotizacionModule[] =[];
  cotizacionesARSBTC : CotizacionModule[] =[];
  cotizacionesUSDETH : CotizacionModule[] =[];
  cotizacionesEURETH : CotizacionModule[] =[];
  cotizacionesARSETH : CotizacionModule[] =[];
  cotizacionesARSLTC : CotizacionModule[] =[];
  cotizacionesUSDLTC : CotizacionModule[] =[];
  cotizacionesEURLTC : CotizacionModule[] =[];
  isLoad: boolean = false;
  subscripcion : Subscription;
  customOptions: OwlOptions = {
    pullDrag: true,
    dots: true,
    navSpeed: 3000,
   // rtl: true,
    mouseDrag: true,
    touchDrag: true,
    loop: true,
    margin: 20,
    autoplay: true,
    slideTransition: 'linear',
    autoplayTimeout: 0,
    autoplaySpeed: 20000,
    autoplayHoverPause: false,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    }
  }
  constructor(public CotizacionService: CotizacionService, public MonedaService:MonedaService) { 
    interval(60000).subscribe(
      res => {
        this.subscripcion.unsubscribe();
      }
    );
  }

  
  getCotizaciones(){
    console.log('... get cotizaciones funcion')
    this.cotizacionesUSDBTC = [];
    this.cotizacionesEURBTC = [];
    this.cotizacionesARSBTC = [];
    this.cotizacionesUSDETH = [];
    this.cotizacionesEURETH = [];
    this.cotizacionesARSETH = [];
    this.cotizacionesARSLTC = [];
    this.cotizacionesEURLTC = [];
    this.cotizacionesUSDLTC = [];
    this.subscripcion= this.CotizacionService.getCotizacionesV2().subscribe(
      res=>{
         console.log(res);
        this.CotizacionService.cotizacionesUSDBTC =   res['BTCUSD'];
        this.CotizacionService.cotizacionesEURBTC =   res['BTCEUR'];
        this.CotizacionService.cotizacionesARSBTC =   res['BTCARS'];
        this.CotizacionService.cotizacionesUSDETH =   res['ETHUSD'];
        this.CotizacionService.cotizacionesEURETH =   res['ETHEUR'];
        this.CotizacionService.cotizacionesARSETH =   res['ETHARS'];
        this.CotizacionService.cotizacionesARSLTC =   res['LTCARS'];
        this.CotizacionService.cotizacionesEURLTC =    res['LTCEUR'];
        this.CotizacionService.cotizacionesUSDLTC =    res['LTCUSD'];
        this.isLoad = true;

        this.CotizacionService.cotizacionesEURLTC.forEach(element => {
          if(element.proveedor === 'Bit2me' ){
            this.CotizacionService.changeBit2meEURLTC(element) ;
          }
        });
        this.CotizacionService.cotizacionesARSLTC.forEach(element => {
          if(element.proveedor === 'Cryptomkt' ){
            this.CotizacionService.changeCryptomktARSETH(null) ;
          }
        });

        this.CotizacionService.cotizacionesEURETH.forEach(element => {
          if(element.proveedor === 'Bit2me' ){
            this.CotizacionService.changeBit2meEURETH(element) ;
          }
        });
        this.CotizacionService.cotizacionesARSETH.forEach(element => {
          if(element.proveedor === 'Cryptomkt' ){
            this.CotizacionService.changeCryptomktARSETH(element) ;
            console.log('ESSSSS ETH ARSSSSSSS')
          }
        });
        this.CotizacionService.cotizacionesUSDETH.forEach(element => {
          if(element.proveedor === 'Coinbase' ){
            this.CotizacionService.changeCoinbaseUSDETH(element) ;
          }
        });

        this.CotizacionService.cotizacionesEURBTC.forEach(element => {
          if(element.proveedor === 'Bit2me' ){
            this.CotizacionService.changeBit2meEURBTC(element) ;
          }
        });
        this.CotizacionService.cotizacionesARSBTC.forEach(element => {
          if(element.proveedor === 'ArgenBtc' ){
            this.CotizacionService.changeArgenbtcARSBTC(element) ;
          }
        });
        this.CotizacionService.cotizacionesUSDBTC.forEach(element => {
          if(element.proveedor === 'Bitstamp' ){
            this.CotizacionService.changeBitstampUSDBTC(element) ;
          }
        });
        this.getCotizaciones();
      }
    )

  }
  ngOnInit(): void {
    this.getCotizaciones();
  }


}
