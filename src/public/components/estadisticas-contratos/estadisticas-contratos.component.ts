import { CotizacionService } from './../../../services/cotizacion/cotizacion.service';
import { AuthService } from './../../../services/authService/auth.service';
import { ContratoService } from './../../../services/contrato/contrato.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstadisticasContratosModule } from 'src/modelos/estadisticas-contratos/estadisticas-contratos.module';

@Component({
  selector: 'estadisticas-contratos',
  templateUrl: './estadisticas-contratos.component.html',
  styleUrls: ['./estadisticas-contratos.component.scss']
})
export class EstadisticasContratosComponent implements OnInit {
    activo : EstadisticasContratosModule;
    finalizado: EstadisticasContratosModule;
    sinActivar : EstadisticasContratosModule;
    total_contratos : number = 0;
    total_kualians : number = 0 ;
    eth_recibido : number = 0;
    eth_pagado : number = 0;
    cotizacionETHUSD : number = 0;
  constructor(private ContratoService : ContratoService,
              private route: Router,
              private auth : AuthService,
              private CotizacionService : CotizacionService) {
        if( this.auth.isAuthenticatede()){
          this.CotizacionService.CcoinbaseUSDETH.subscribe(
            cotizacion => { this.cotizacionETHUSD = cotizacion['compra']
          }
          )
          const usuario = this.auth.getLocal().split('"')[1];
          this.ContratoService.getEstadisticasContratos(usuario).subscribe(
            res => {
             
              for (let index = 0; index < 3; index++) {
                console.log(res)
                if (res['body'][index]) {
                  const element = res['body'][index];
                  this.total_contratos = this.total_contratos + parseInt(element['contratos']);
                  this.total_kualians = this.total_kualians + parseInt(element['cantidad']);
                  this.eth_pagado = this.eth_pagado + parseFloat(element['eth_pagado']);
                  this.eth_recibido = this.eth_recibido + parseFloat(element['eth_recibido']);
                  //console.log(element);
                  if( element['status'] === 'Activo') {
                    this.activo = element ;
                  }
                  if( element['status'] === 'Sin activar') {
                    this.sinActivar = element ;
  
                  }
                  if( element['status'] === 'Finalizado') {
                    this.finalizado = element ;
                  }
                }
              }
            }
  
          )
        }
   }

  ngOnInit(): void {
  }

}
