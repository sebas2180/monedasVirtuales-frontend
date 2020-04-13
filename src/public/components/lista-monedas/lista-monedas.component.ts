import { CotizacionModule } from './../../../modelos/cotizacion/cotizacion.module';
import { CotizacionService } from './../../../services/cotizacion/cotizacion.service';
import { MonedaModule } from '../../../modelos/moneda/moneda.module';
import { MonedaService } from '../../../services/moneda/moneda.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lista-monedas',
  templateUrl: './lista-monedas.component.html',
  styleUrls: ['./lista-monedas.component.scss']
})
export class ListaMonedasComponent implements OnInit {
    monedasBTC: MonedaModule[]; monedasETC: MonedaModule[]; monedasLTC: MonedaModule[];
    moneda_seleccionada: string= 'ARS';
    colorARS  ='basic';
    colorEUR ='primary';
    colorUSD= 'primary';
    total_monedero :number=0;
    total_BTC :number=0;
    total_ETH :number=0;
    total_LTC:number=0;
  
  constructor(public MonedaService: MonedaService,public CotizacionService: CotizacionService) {
    this.MonedaService.getMonedas().subscribe(
      res => {
        console.log(res);
        if(res['BTC'][0]){
          this.monedasBTC = res['BTC'][0];
        }
        if(res['ETC'][0]){
          this.monedasETC = res['ETC'][0];
        }
        if(res['LTC'][0]){
          this.monedasLTC=res['LTC'][0];
        }
      }, err => {
        console.log(err);
      }
    )
  }
  changeMoneda(moneda) {
    this.total_monedero = 0;
    if(moneda === 'ARS') {
      this.colorARS = 'basic';  this.colorEUR = 'primary'; this.colorUSD = 'primary';
      this.moneda_seleccionada = 'ARS';
    }
    if(moneda === 'EUR') {
      this.colorARS = 'primary';  this.colorEUR = 'basic'; this.colorUSD = 'primary';
      this.moneda_seleccionada = 'EUR';
    }
    if(moneda === 'USD') {
      this.colorARS = 'primary';  this.colorEUR = 'primary'; this.colorUSD = 'basic';
      this.moneda_seleccionada = 'USD';
    }
  }
  setTotal(e){
    if(e.a){
      switch(e.b){
        case 'Ethereum':
          this.total_ETH = e.a;
          break;
        case 'Bitcoin':
          this.total_BTC = e.a;
          break;
        case 'Litecoin':
          this.total_LTC = e.a;
          break;
      }
      this.total_monedero = this.total_ETH + this.total_BTC + this.total_LTC;
    }
  }
  ngOnInit(): void {
     
  }

}
