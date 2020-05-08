import { CotizacionService } from './../../../services/cotizacion/cotizacion.service';
import { EstadisticasMonedasModule } from './../../../modelos/estadisticas-monedas/estadisticas-monedas.module';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'view-estadistica-compra',
  templateUrl: './view-estadistica-compra.component.html',
  styleUrls: ['./view-estadistica-compra.component.scss']
})
export class ViewEstadisticaCompraComponent implements OnInit {
  cotizacionUSD : number;
  saldoVendidoUSD : number = 0;
  saldoRestanteUSD: number = 0;
  colorSaldo : string = "red";

  @Input() estadistica : EstadisticasMonedasModule;
  constructor(private CotizacionService : CotizacionService) {

  }

  ngOnInit(): void {
    if(this.estadistica){
        if(this.estadistica.tipo_moneda === 'Bitcoin') {
          this.CotizacionService.CbitstampUSDBTC.subscribe(
              res => {
              this.cotizacionUSD = res.compra;
                this.saldoRestanteUSD = (this.estadistica.compra-this.estadistica.venta)*
                (this.cotizacionUSD-this.estadistica.promedio_restante);
            }
          )
        }
        if(this.estadistica.tipo_moneda === 'Ethereum') {
          this.CotizacionService.CcoinbaseUSDETH.subscribe(
              res => {
              this.cotizacionUSD = res.compra;
                this.saldoRestanteUSD = (this.estadistica.compra-this.estadistica.venta)*
                (this.cotizacionUSD-this.estadistica.promedio_restante);
            }
          )
        }
        if( this.saldoRestanteUSD < 0 ) {
          this.colorSaldo= "red"
        } else {
          this.colorSaldo = "green" ;
        }
  }
  }

}
