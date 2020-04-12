import { CotizacionModule } from './../../../modelos/cotizacion/cotizacion.module';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.scss']
})
export class CotizacionComponent implements OnInit {

  @Input() CotizacionModule: CotizacionModule[];
  constructor() { }
  ngOnInit(): void {
  }

}
