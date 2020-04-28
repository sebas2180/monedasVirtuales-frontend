import { ContratoModule } from 'src/modelos/contrato/contrato.module';
import { ContratoService } from './../../../services/contrato/contrato.service';
import { DatePipe } from '@angular/common';
import { MonedaService } from './../../../services/moneda/moneda.service';
import { MonedaComponent } from './../moneda/moneda.component';
import { AuthService } from './../../../services/authService/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-nuevo-contrato',
  templateUrl: './nuevo-contrato.component.html',
  styleUrls: ['./nuevo-contrato.component.scss']
})
export class NuevoContratoComponent implements OnInit {
  @Output() change_isNuevoContrato = new EventEmitter();
  @Output() nuevo_contrato :EventEmitter<ContratoModule> = new EventEmitter();
  fechaActual =  Date.now();
  pipe = new DatePipe('en-US');
  fechaConvertida  = this.pipe.transform(this.fechaActual,'yyy-MM-dd');
  isPrincipal: boolean = false;
  isLogeado: boolean = false;
  verMenu: boolean = false;
   form: FormGroup; 
   tipo_contratos = ['Bajo riesgo','Medio riesgo', 'Alto riesgo'];
   tipo_cantidad = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
   tipo_monederos = [''];

  newForm(){
    var usuario =this.AuthService.getLocal().split('"')[1];
    this.form = new FormGroup({
      categoria: new FormControl('',[Validators.required]),
      cantidad: new FormControl('',[Validators.required,Validators.min(0)]),
      eth_pagado: new FormControl('',[Validators.required,Validators.min(0)]),
      id_usuario: new FormControl(usuario,[Validators.required]),
      nombreMonedero: new FormControl('',[Validators.required]),
      fechaActual: new FormControl(this.fechaConvertida),
    });
  }
  constructor(private AuthService : AuthService,
              private MonedaService : MonedaService,
              private contratoService: ContratoService ) {
    this.MonedaService.getMonedas()
    this.newForm();
    if(this.AuthService.isAuthenticatede){
      this.MonedaService.getNombreMonedas(this.AuthService.getLocal(), 'Ethereum').subscribe(
        res => {
          for (let index = 0; index < 20; index++) {
            if(res['body'][index]) {
              var encontrado: boolean = false;
              this.tipo_monederos.forEach(element => {
                if (element == res['body'][index]['monedero']){ encontrado = true;}
              });
              if( !encontrado ) {
                this.tipo_monederos.push(res['body'][index]['monedero']);
              }
            }
          }
       
        }
      );
      // alert('true');
       this.isPrincipal = false;
       this.isLogeado = true;
       this.verMenu = false;
     }
   }
   volver(){
    this.change_isNuevoContrato.emit();
   }
   enviar(){
     if(!this.form.invalid) {
      Swal.fire({
        title: `Estas por guardar un contrato de ${this.form.get('categoria').value}`,
        text: `Cantidad de kuals  ${this.form.get('cantidad').value}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, generlo!'
      }).then((result) => {
        this.MonedaService.getIdMonederos( this.form.get('nombreMonedero').value , this.form.get('id_usuario').value)
        .subscribe(
         res => {
            console.log(res['body']['id']);
            const id_monedero = res['body']['id'];
            var dataForm = new FormData();
            dataForm.append('id_monedero', id_monedero);
            dataForm.append('id_usuario', this.form.get('id_usuario').value);
            dataForm.append('cantidad', this.form.get('cantidad').value);
            dataForm.append('categoria', this.form.get('categoria').value);
            dataForm.append('eth_pagado', this.form.get('eth_pagado').value);
            this.contratoService.setContrato(dataForm).subscribe(
              res => {
                const status = res['status'];
                if ( status === 769 ) {
                 Swal.fire({
                   icon: 'success',
                   title: res['msj']
                 }).then(
                   r => {
                       this.change_isNuevoContrato.emit();
                       }
                   )
                } else {
                 Swal.fire({
                   icon: 'error',
                   title: res['msj']
                 })
                }
              }
            )
          },
          err => {
            console.log('Hubo un error');
          }
       )
         
      })
     } else {
      // console.log(this.form.get('monedero').value);
      // console.log(this.form.get('eth_pagado').value);
      // console.log(this.form.get('usuario').value);
      // console.log(this.form.get('cantidad').value);

     }
   }
  ngOnInit(): void {
  }

}
