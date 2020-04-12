import { MonedaService } from './../../../services/moneda/moneda.service';
import { CotizacionModule } from './../../../modelos/cotizacion/cotizacion.module';
import { CotizacionService } from './../../../services/cotizacion/cotizacion.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { interval } from 'rxjs';
@Component({
  selector: 'lista-cotizaciones',
  templateUrl: './lista-cotizaciones.component.html',
  styleUrls: ['./lista-cotizaciones.component.scss']
})
export class ListaCotizacionesComponent implements OnInit {
  cotizacionesUSDBTC : CotizacionModule[] =[];
  cotizacionesEURBTC : CotizacionModule[] =[];
  cotizacionesARSBTC : CotizacionModule[] =[];
  cotizacionesUSDETH : CotizacionModule[] =[];
  cotizacionesEURETH : CotizacionModule[] =[];
  cotizacionesARSETH : CotizacionModule[] =[];
  cotizacionesARSLTC : CotizacionModule[] =[];
  cotizacionesEURLTC : CotizacionModule[] =[];
  isLoad: boolean = false;
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
  }

  ngOnInit(): void {
    interval(2000).subscribe(
      res=>{
        this.cotizacionesUSDBTC = [];
        this.cotizacionesEURBTC = [];
        this.cotizacionesARSBTC = [];
        this.cotizacionesUSDETH = [];
        this.cotizacionesEURETH = [];
        this.cotizacionesARSETH = [];
        this.cotizacionesARSLTC = [];
        this.cotizacionesEURLTC = [];
        this.CotizacionService.getCotizaciones().subscribe(
          res=>{
            if(res['status']==770){
              var cotizaciones = res['cotizaciones'];
              cotizaciones.forEach(registro => {
                if(registro.symbol == 'BTC'){
                  if(registro.base =='ARS' ){
                    this.cotizacionesARSBTC.push(registro);
                     
                    if(registro['proveedor'] == 'ArgenBtc'){
                      this.CotizacionService.changeArgenbtcARSBTC(registro);
                    }
                  }
                  if(registro.base =='EUR'){
                    this.cotizacionesUSDBTC.push(registro);
                    if(registro['proveedor'] == 'Bit2me'){
                      this.CotizacionService.changeBit2meEURBTC(registro);
                    }
                  }
                  if(registro.base =='USD' ){
                    this.cotizacionesEURBTC.push(registro);
                    if(registro['proveedor'] == 'Bitstamp'){
                      this.CotizacionService.changeBitstampUSDBTC(registro);
                    }
                  }
                }
                if(registro.symbol == 'ETH'){
                  if(registro.base =='ARS' ){    
                    this.cotizacionesARSETH.push(registro);
                    if(registro['proveedor'] == 'Satoshitango'){
                      this.CotizacionService.changeSatoshitangoARSETH(registro);
                    }
                  }
                  if(registro.base ==='EUR' ){
                       this.cotizacionesEURETH.push(registro);
                       if(registro['proveedor'] == 'Bit2me'){
                        this.CotizacionService.changeBit2meEURETH(registro);
                      }
                  }
                  if(registro.base ==='USD' ){    this.cotizacionesUSDETH.push(registro);    }
                }
                if(registro.symbol == 'LTC'){
                  if(registro.base =='EUR' ){
                    this.cotizacionesEURLTC.push(registro);
                    if(registro['proveedor'] == 'Bit2me'){
                     // console.log(registro['proveedor'] +'   '+registro['compra']);
                      this.CotizacionService.changeBit2meEURLTC(registro);
                    }
                  }
                  if(registro.base =='ARS' ){
                    this.cotizacionesARSLTC.push(registro);
                    if(registro['proveedor'] == 'Satoshitango'){
                      this.CotizacionService.changeSatoshitangoARSLTC(registro);
                    }
                  }
                }
              });
               (this.CotizacionService.CsatoshitangoARSLTC.subscribe(e=>{
                //console.log(e)
              }));
              this.CotizacionService.cotizacionesUSDBTC = this.cotizacionesUSDBTC;
              this.CotizacionService.cotizacionesEURBTC = this.cotizacionesEURBTC;
              this.CotizacionService.cotizacionesARSBTC = this.cotizacionesARSBTC;

              this.CotizacionService.cotizacionesUSDETH = this.cotizacionesUSDETH;
              this.CotizacionService.cotizacionesEURETH = this.cotizacionesEURETH;
              this.CotizacionService.cotizacionesARSETH = this.cotizacionesARSETH;

              this.CotizacionService.cotizacionesARSLTC = this.cotizacionesARSLTC;
              this.CotizacionService.cotizacionesEURLTC = this.cotizacionesEURLTC;
              this.isLoad = true;
            }
          }
        )
      }
    )
  }


}
