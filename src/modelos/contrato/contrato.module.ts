import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ContratoModule {
    id: string;
    categoria: string;
    create_at : Date;
    fecha_fin? : Date;
    fecha_inicio? : Date;
    cantidad: number;
    eth_pagado: string;
    id_usuario : number;
    pagos_registrados : number;
    id_monedero : number;
    status : string;

    deserialize?(input: any): this {
      return Object.assign(this, input);
    }

 }

