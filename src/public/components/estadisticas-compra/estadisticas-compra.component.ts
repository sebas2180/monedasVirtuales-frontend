import { EstadisticasMonedasModule } from './../../../modelos/estadisticas-monedas/estadisticas-monedas.module';

import { MonedaService } from './../../../services/moneda/moneda.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'estadisticas-compra',
  templateUrl: './estadisticas-compra.component.html',
  styleUrls: ['./estadisticas-compra.component.scss']
})
export class EstadisticasCompraComponent implements OnInit {
  @Input() id_usuario : string;
  isLoading :boolean = true;
  Estadisticas :EstadisticasMonedasModule[];
  constructor(private MonedaService : MonedaService) { 
  }

  ngOnInit(): void {
    interval(6000).subscribe(
      res => {
        this.MonedaService.getEstadisticasTransacciones(this.id_usuario).subscribe(
          res => {
            this.isLoading = false;
            // console.log(res);
             this.Estadisticas= res['body'];
          }
        )
      }

    )
  }

}
