import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PagoRealizadoModule { 
  id: number;
  id_contrato: number;
  create_at: Date;
  eth_pagado: number;

  deserialize?(input: any): this {
    return Object.assign(this, input);
  }

}
