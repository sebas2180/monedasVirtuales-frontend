import { CotizacionService } from './../../../services/cotizacion/cotizacion.service';
import { interval } from 'rxjs';
import { PagoRealizadoModule } from './../../../modelos/pago-realizado/pago-realizado.module';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from './../../../services/authService/auth.service';
 
import { ContratoService } from './../../../services/contrato/contrato.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
 
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ContratoModule } from 'src/modelos/contrato/contrato.module';

@Component({
  selector: 'historial-pagos',
  templateUrl: './historial-pagos.component.html',
  styleUrls: ['./historial-pagos.component.scss']
})
export class HistorialPagosComponent implements OnInit {
  @Output() emitterVolver = new EventEmitter();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @Input() contrato : ContratoModule  ;
  pagos : PagoRealizadoModule[];
  displayedColumns: string[] = ['id','create_at','eth_pagado','cotizacion'];
  cotizacionCopayVenta : number = 0;
  dataSource;
  constructor(private ContratoService :ContratoService,
    private AuthserviceService: AuthService,
    public CotizacionService : CotizacionService) {

  }

  ngOnInit(): void {
    // this.CotizacionService.CbitstampUSDBTC.subscribe(
    //   res => {
    //    this.cotizacionCopayVenta = (res.venta );
    //   },err => {
    //     console.log(err)
    //   }
    // )
   if( this.contrato ) {
    const usuario = this.AuthserviceService.getLocal().split('"')[1];
    this.ContratoService.getListaPagos(this.contrato.id,usuario).subscribe(
      res => {
        this.cotizacionCopayVenta = parseFloat ( res['CopayUSD']['compra'] );
        this.pagos = res['pagos'];
        
        this.dataSource = new MatTableDataSource<PagoRealizadoModule>(this.pagos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
    }
  }
  volver(){
    this.emitterVolver.emit(true);
  }

}
