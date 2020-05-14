import { MonedaService } from './../../../services/moneda/moneda.service';
import { interval } from 'rxjs';
import { CotizacionModule } from './../../../modelos/cotizacion/cotizacion.module';
import { CotizacionService } from './../../../services/cotizacion/cotizacion.service';
import { MonedaModule } from '../../../modelos/moneda/moneda.module';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-moneda',
  templateUrl: './moneda.component.html',
  styleUrls: ['./moneda.component.scss']
})
export class MonedaComponent implements OnInit {
  @Output() export_total =new EventEmitter();
 
  @Input() monedas: MonedaModule[];
  @Input() tipo_moneda: string = 'ARS';
  // cotizacionkLARS : number;
  // cotizacionkLUSD : number;
  // cotizacionkLEuro : number;
  cotizacionbitstampUSDBTC : number;
  cotizacionbitArgenBTCARS : number;
  cotizacionbit2meEURBTC : number;
  cotizacionbit2meEURLTC : number;
  cotizacionbit2meEURETH : number;
  cotizacionCoinbaseUSDETH : number;
   cotizacionSatoARSLTC : number;
  cotizacionCritpETHARS : number;
  importeTotal: number = 0;
  importeTotalMultiplicado: number = 0;
  multiplicador: number = 0;
  titulo: string;
  lugarVenta: string ='';
  isPrimeraIteracion :boolean = true;
  importeVenta : number = 0 ;
  constructor(public CotizacionService: CotizacionService,private MonedaService: MonedaService) { 

    interval(5000).subscribe(
      resp=>{
        this.comprobar_titulo();
                  ///////// ETHEREUM ///////////////////
        this.CotizacionService.Cbit2meEURETH.subscribe(cotizacion1=>{
          if(cotizacion1){
            this.cotizacionbit2meEURETH = cotizacion1['compra'];
          }
        });
        this.CotizacionService.CcryptomrkETHARS.subscribe(cotizacion2=>{
          if(cotizacion2){
            this.cotizacionCritpETHARS = cotizacion2['compra'];
          }
        });
                      ///////// LITECOIN ///////////////////
        this.CotizacionService.Cbit2meEURLTC.subscribe(cotizacion3=>{
          if(cotizacion3){
            //console.log(cotizacion['compra']);
            this.cotizacionbit2meEURLTC = cotizacion3['compra'];
          }
        });
        this.CotizacionService.CcoinbaseUSDETH.subscribe(cotizacion4=>{
          if(cotizacion4){
            this.cotizacionCoinbaseUSDETH = cotizacion4['compra'];
          }
        });
                    ///////// BITCOIN ///////////////////
        this.CotizacionService.Cbit2meEURBTC.subscribe(cotizacion5=>{
          if(cotizacion5){
            this.cotizacionbit2meEURBTC = cotizacion5['compra'];
          }
        });
        this.CotizacionService.CargenbtcARSBTC.subscribe(cotizacion6=>{
          if(cotizacion6){
            this.cotizacionbitArgenBTCARS = cotizacion6['compra'];
          }
        });
        this.CotizacionService.CbitstampUSDBTC.subscribe(cotizacion7=>{
          if(cotizacion7){
            if(cotizacion7['compra']>0){
              this.isPrimeraIteracion=false;
            }
            this.cotizacionbitstampUSDBTC = cotizacion7['compra'];
          }
        });
      }
    );
  }
  comprobar_titulo(){
    switch(this.tipo_moneda){
      case 'ARS':
        switch(this.titulo){
          case 'Bitcoin':  this.lugarVenta='Argenbtc';
                          if(!this.isPrimeraIteracion){
                            this.multiplicador = this.cotizacionbitArgenBTCARS;
                          } else {
                                this.multiplicador = this.monedas[0].compraARS ;
                          }
              break;
      case 'Kuanliandp':  this.lugarVenta='USD';
              this.multiplicador = 80*132 ;
              //this.export_total.emit({a: this.importeTotalMultiplicado,b:this.titulo});
        break;
          case 'Litecoin':  this.lugarVenta='Satoshitango';
                            this.multiplicador = this.cotizacionSatoARSLTC;
                           // this.multiplicador = this.cotizacionSatoARSLTC;
              break;
          case 'Ethereum':  this.lugarVenta='Cryptomarkt';
                            if(!this.isPrimeraIteracion){
                              this.multiplicador = this.cotizacionCritpETHARS;
                            } else {
                                  this.multiplicador = this.monedas[0].compraARS ;
                            }
                break;
              break;
        }
        this.importeTotalMultiplicado = this.importeTotal * this.multiplicador;
        this.export_total.emit({a: this.importeTotalMultiplicado,b:this.titulo});
        break;
        case 'USD':
          switch(this.titulo) {
            case 'Bitcoin':  this.lugarVenta = 'Decrypto';
                            if(!this.isPrimeraIteracion){
                                this.multiplicador = this.cotizacionbitstampUSDBTC;
                              } else {
                                this.multiplicador = this.monedas[0].compraUSD ;
                              }
                break;
            case 'Ethereum':  this.lugarVenta = 'Coinbase';
                              if(!this.isPrimeraIteracion){
                                this.multiplicador = this.cotizacionCoinbaseUSDETH ;
                              } else {
                                this.multiplicador = this.monedas[0].compraUSD ;

                              }
                              break;
            case 'Kuanliandp':  this.lugarVenta='USD';
                              this.multiplicador = 80 ;
                              //this.export_total.emit({a: this.importeTotalMultiplicado,b:this.titulo});
                      break;
            case 'Litecoin':  this.lugarVenta = 'Coinbase';
                              this.multiplicador = this.cotizacionbit2meEURLTC * 1.10 ;
                break;
             
        }
        this.importeTotalMultiplicado = this.importeTotal * this.multiplicador;
          this.export_total.emit({  a: this.importeTotalMultiplicado, b : this.titulo });
        break;
      case 'EUR':
        switch(this.titulo){
          case 'Bitcoin':  this.lugarVenta='Bit2me';
                           if(!this.isPrimeraIteracion){
                            this.multiplicador = this.cotizacionbit2meEURBTC;
                          } else {
                            this.multiplicador = this.monedas[0].compraEUR ;
                          }
              break;
          case 'Litecoin':  this.lugarVenta='Bit2me';
                            this.multiplicador = this.cotizacionbit2meEURLTC ;
                            //this.export_total.emit({a: this.importeTotalMultiplicado,b:this.titulo});
              break;
          case 'Kuanliandp':  this.lugarVenta='EURO';
              this.multiplicador =  (1.085*80) ;
              //this.export_total.emit({a: this.importeTotalMultiplicado,b:this.titulo});
            break;
          case 'Ethereum':  this.lugarVenta='Bit2me';
                            if(!this.isPrimeraIteracion){
                              this.multiplicador = this.cotizacionbit2meEURETH;
                            } else {
                              this.multiplicador = this.monedas[0].compraEUR ;
                            }
              break;
        }

        this.importeTotalMultiplicado = this.importeTotal * this.multiplicador;
        this.export_total.emit({a: this.importeTotalMultiplicado, b : this.titulo});
        break;

    }
  }
  ngOnInit(): void {
    this.titulo=this.monedas[0].nombre;
    for (let index = 0; index <100; index++) {
      if(this.monedas[index]){
        this.importeTotal+=this.monedas[index].importe;
      }
     }

    // console.log(this.importeTotal);
  }
  
}
