import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class EstadisticasContratosModule {
  status: string;
  eth_pagado: string;
  eth_recibido: string;
  cantidad: number;
  contratos: number;

  deserialize?(input: any): this {
    return Object.assign(this, input);
  }

 }
