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
  nombre?: string;
  symbol?:string;
  cotizacion?: number;
  importe?: number;
  create_at?: Date;
  monedero?:string;
}
