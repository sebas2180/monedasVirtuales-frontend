import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class EstadisticasMonedasModule { 
  id: number;
  tipo_moneda: string;
  compra: number;
  venta: number;
  restante: number;
  cotizacion_compra: number;
  N_compra: number;
  promedio_compra: number;
  cotizacion_venta: number;
  N_venta: number;
  promedio_venta: number;
  cotizacion_restante: number;
  N_restante: number;
  promedio_restante : number;

  
  deserialize?(input: any): this {
    return Object.assign(this, input);
  }

  
}
