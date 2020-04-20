import { AuthService } from './../../../services/authService/auth.service';
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
    isLoading : boolean = true;

    view: any[] = [700, 400];
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Number';
    showYAxisLabel = true;
    yAxisLabel = 'data';
    timeline = true;
     colorScheme = {
      domain: ['#E91E63', '#CDDC39', '#3F51B5', '#AAAAAA']
    };


  constructor(public MonedaService: MonedaService,public CotizacionService: CotizacionService,
              private AuthService: AuthService) {
     
    this.MonedaService.getMonedas().subscribe(
      res => {
        console.log(res);
        if(res['status']==760){
          this.AuthService.clearLocalStorage();
        }
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
    this.isLoading= true;
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
     
    const data = [
      {
        "name": "Germany",
        "value": 40632,
        "extra": {
          "code": "de"
        }
      },
      {
        "name": "United States",
        "value": 50000,
        "extra": {
          "code": "us"
        }
      },
      {
        "name": "France",
        "value": 36745,
        "extra": {
          "code": "fr"
        }
      },
      {
        "name": "United Kingdom",
        "value": 36240,
        "extra": {
          "code": "uk"
        }
      },
      {
        "name": "Spain",
        "value": 33000,
        "extra": {
          "code": "es"
        }
      },
      {
        "name": "Italy",
        "value": 35800,
        "extra": {
          "code": "it"
        }
      }
    ];
    
  }

}
