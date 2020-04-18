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
  importeCompraUSD : number;
  importeActualUSD: number;
  
  @Input() estadistica : EstadisticasMonedasModule;
  constructor(private CotizacionService : CotizacionService) {

    this.CotizacionService.CbitstampUSDBTC.subscribe(
      res => {
        this.cotizacionUSD = res.compra;
      }
    )
   }

  ngOnInit(): void {
  }

}
