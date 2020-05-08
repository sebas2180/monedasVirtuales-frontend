import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CotizacionModule { 

  id?:number;
  symbol?:string;
  name?:string;
  base?:string;
  compra?: number;
  venta?: number;
  proveedor?: string;
  variacionDia? : number ;
  variacionHora? : number;

    
  deserialize?(input: any): this {
    return Object.assign(this, input);
  }

}
