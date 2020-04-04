import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    
  ]
})
export class UsuarioModelModule { 
  id: number;
  nombre:string;
  apellido:string;
  email:string;
  usuario:string;
  password:string;
  rol:string;
  create_at:  Date;
}
