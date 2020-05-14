import { AuthService } from './../../../services/authService/auth.service';
import { MonedaService } from './../../../services/moneda/moneda.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'nuevo-monedero',
  templateUrl: './nuevo-monedero.component.html',
  styleUrls: ['./nuevo-monedero.component.scss']
})
export class NuevoMonederoComponent implements OnInit {
  @Output()  cerrar : EventEmitter<boolean>= new EventEmitter;
  color_compra : string ='primary';
  form: FormGroup;
  tipo_moneda : string[] = ['Bitcoin' , 'Ethereum' , 'Litecoin'];
  //isNuevo: boolean = false;
  constructor( private MonedaService : MonedaService,
                private AuthService : AuthService) {
    
    this.newForm();
   }

  newForm() {
    var usuario = this.AuthService.getLocal().split('"')[1];
   this.form =new FormGroup({
    moneda: new FormControl('',[Validators.required]),
    id_usuario: new FormControl(usuario, [ Validators.required]),
    nombre: new FormControl('',[Validators.required])
   }
 
   )
  }
  ngOnInit(): void {
  }
  guardar() {
      if( ! this.form.invalid ) {
        var dataForm = new FormData();
        dataForm.append('importe','0');
        dataForm.append('nombre',this.form.get('moneda').value);
        dataForm.append('id_usuario',this.form.get('id_usuario').value );
        dataForm.append('monedero',this.form.get('nombre').value);
        dataForm.append('agrega_montos','false');
        this.MonedaService.addMoneda(dataForm).subscribe(
          res=> {
            if( res['status'] === 752 ){ 
              this.form.reset();
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Monedero creado con exito!',
                showConfirmButton: false,
                timer: 2500
              }).then(
                ree => {
                  this.salir();
                }
              )

            } else {
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: res['msj'],
                showConfirmButton: false,
                timer: 1500
              })
            }
            console.log(res);
          },
          err=> {
            console.log( err ) ;
          }
        )
      } else {

      }
  }
  salir() {
      this.cerrar.emit(false);
  }
  // crear_monedero(){

  //   this.isNuevo = true;
  //   this.isNuevoMonedero.emit(true);
  // }
}
