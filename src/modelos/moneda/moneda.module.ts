import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class MonedaModule {
  id: number;
  nombre: string;
  cotizacion: number;
  importe: number;
}
