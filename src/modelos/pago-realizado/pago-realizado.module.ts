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
  createat: Date;
  eth_pagado: number;
}
