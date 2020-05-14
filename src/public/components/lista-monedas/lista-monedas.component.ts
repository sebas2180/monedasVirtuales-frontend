import { Router } from '@angular/router';
 
import { Chart } from 'chart.js';
import { AuthService } from './../../../services/authService/auth.service';
import { CotizacionModule } from './../../../modelos/cotizacion/cotizacion.module';
import { CotizacionService } from './../../../services/cotizacion/cotizacion.service';
import { MonedaModule } from '../../../modelos/moneda/moneda.module';
import { MonedaService } from '../../../services/moneda/moneda.service';
import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import  Swal  from 'sweetalert2';
//import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-lista-monedas',
  templateUrl: './lista-monedas.component.html',
  styleUrls: ['./lista-monedas.component.scss']
})
export class ListaMonedasComponent implements OnInit {
    monedasBTC: MonedaModule[]; monedasETC: MonedaModule[]; monedasLTC: MonedaModule[];monedasKL: MonedaModule[];
    moneda_seleccionada: string= 'ARS';
    colorARS  ='basic';
    colorEUR ='primary';
    colorUSD= 'primary';
    total_monedero :number=0;
    total_BTC :number=0;
    total_ETH :number=0;
    total_LTC:number=0;
    total_KL:number=0;
    por_ETH : number =0;
    por_BTC : number =0 ;
    por_LTC : number =0 ;
    por_KL : number =0 ;
    isLoading : boolean = true;
    graficoCharged : number = 0;
    title = 'angular8chartjs';
    canvas: any;
    ctx: any;
    ngAfterViewInit() {
          this.setGrafico();
    }


  constructor(public MonedaService: MonedaService,public CotizacionService: CotizacionService,
              private AuthService: AuthService
              ,private route: Router) {
    this.MonedaService.getMonedas().subscribe(
      res => {
        console.log(res);
        if ( res['status'] === 760 ){
          Swal.fire({
            icon: 'warning',
            timer: 1500,
            title: 'Se ha deslogeado por limite de tiempo.'
          }).then(
            r=>{
             this.AuthService.clearLocalStorage();
             this.route.navigate(['/pantallaprincipal']);
            })
         }
        if(res['BTC'][0]){
          this.monedasBTC = res['BTC'];
        }
        if(res['ETC'][0]){
          this.monedasETC = res['ETC'];
        }
        if(res['LTC'][0]){
          this.monedasLTC=res['LTC'];
        }
        if(res['KL'][0]){
          this.monedasKL=res['KL'];
        }
      }, err => {
        console.log(err);
      }
    )
    
  }
  changeMoneda(moneda) {
    this.graficoCharged=0;
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
        case 'Bitcoin':
          this.total_BTC = e.a;
          break;
        case 'Ethereum':
          this.total_ETH = e.a;
          break;
        case 'Litecoin':
          this.total_LTC = e.a;
          break;
        case 'Kuanliandp':
          this.total_KL = e.a;
          break;
      }
      this.total_monedero = this.total_ETH + this.total_BTC + this.total_LTC+this.total_KL;
      this.por_BTC =parseFloat( ( (100/this.total_monedero)*this.total_BTC).toPrecision(4) );
      this.por_KL =parseFloat( ( (100/this.total_monedero)*this.total_KL).toPrecision(4) );
      this.por_ETH = parseFloat(((100/this.total_monedero)*this.total_ETH).toPrecision(4));
      this.por_LTC = (100/this.total_monedero)*this.total_LTC;
      if(this.graficoCharged < 4){
        this.setGrafico();
      }
    }
  }
  setGrafico(){
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
 
    let myChart = new Chart(this.ctx, {
      type: 'doughnut',
      data: {
          labels: ["Bitcoin", "Ethereum", "Litecoin","Kuanliandp"],
          datasets: [{
              label: 'Monedero',
              data: [ this.por_BTC, this.por_ETH, this.por_LTC,this.por_KL],
              backgroundColor: [
                  'rgb(253, 249, 255)',
                  'rgb(122, 5, 201)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive :true,
        title: {
          display: true,
          text: 'Porcentaje de plata segun moneda'
        }
      }
    });
    Chart.defaults.global.defaultFontColor = '#fff';
    this.graficoCharged++;
  }
  ngOnInit(): void {

  }

}
