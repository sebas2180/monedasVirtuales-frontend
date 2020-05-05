import { Router } from '@angular/router';
import { MonedaService } from './../../../services/moneda/moneda.service';
import { AuthService } from './../../../services/authService/auth.service';
import { MonedaComponent } from './../moneda/moneda.component';
import { MonedaModule } from './../../../modelos/moneda/moneda.module';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2' ;

@Component({
  selector: 'transferencia-saldo',
  templateUrl: './transferencia-saldo.component.html',
  styleUrls: ['./transferencia-saldo.component.scss']
})
export class TransferenciaSaldoComponent implements OnInit {
  form: FormGroup;
  monederos : MonedaModule[];
  monedas : string[] = ['Bitcoin','Ethereum','Litecoin'];
  IsMonedaSeleccionada : boolean = false;
  monedaAuxiliar : MonedaModule ;
  saldoActual : number = 0;
  newForm() {
    var usuario = this.AuthService.getLocal().split('"')[1];
    this.form = new FormGroup({
      moneda : new FormControl('',Validators.required),
      origen : new FormControl('',Validators.required),
      destino : new FormControl('',Validators.required),
      saldo_actual : new FormControl({value: '0', disabled: true},[Validators.required]),
      agregar : new FormControl('',[Validators.required]),
      tipo_operacion : new FormControl('Transferencia',[Validators.required]),
      id_usuario: new FormControl(usuario, [ Validators.required])
    });
  }
  constructor(private MonedaService : MonedaService, private AuthService: AuthService ,
              private route : Router) {
    this.newForm();
   }

  ngOnInit(): void {
  }

  modificarSaldo( ){

  }
  reset(){
    this.newForm();
    this.IsMonedaSeleccionada = false;
  }
  obtener_saldo(){
    var nombreMonedero = '';
    if (this.form.get('origen').value != ''){
      nombreMonedero = this.form.get('origen').value ;
      
          
      this.MonedaService.getNombreMonedero(this.form.get('origen').value).subscribe(
        res0 => {
          this.MonedaService.getMoneda(this.form.get('id_usuario').value, this.form.get('moneda').value, res0['monedero']).subscribe(
            res => {
              if ( res['body']['status'] === 760 ){
                Swal.fire({
                  icon: 'warning',
                  timer: 1500,
                  title: 'Se ha deslogeado por limite de tiempo.'
                }).then(
                  r=>{
                   this.AuthService.clearLocalStorage();
                   this.route.navigate(['/pantallaprincipal']);
                  })
               }
              if ( res['body']['status'] === 770  ) {
               // console.log(this.monedaAuxiliar );
                this.monedaAuxiliar =  res['body']['moneda'] ;
                console.log(  this.monedaAuxiliar.importe ) ;
                this.saldoActual = this.monedaAuxiliar.importe;
                this.form.patchValue( { 'saldo_actual' : this.monedaAuxiliar.importe } );
              }
            }
          )
          }
  
      )
    }
  }
  buscar_monederos() {
    const moneda = (this.form.get('moneda').value);
    this.monederos = [];
        this.MonedaService.getMonedas().subscribe(
      res => {
        
        if(this.form.get('moneda').value === 'Bitcoin') {
          this.monederos = res['BTC'] ;
        }
        if(this.form.get('moneda').value === 'Ethereum') {
          this.monederos = res['ETC'] ;
        }
        if(this.form.get('moneda').value === 'Litecoin') {
          this.monederos = res['LTC'] ;
        }
         
       this.IsMonedaSeleccionada = true ;
      }
    );
  }
  comprobar_origen_destino() {
    if(this.form.get('origen').value === this.form.get('destino').value ) {
      Swal.fire({
        icon: 'info',
        timer: 1500,
        title: 'El origen y destino no pueden ser iguales'
      })
    }
  }
  enviar() {
    if(!this.form.invalid)  {
      if(this.form.get('origen').value != this.form.get('destino').value ) {
        if( this.form.get('agregar').value <= this.form.get('saldo_actual').value ) {
          var dataForm = new FormData();
          dataForm.append('id_monedero_origen',this.form.get('origen').value);
          dataForm.append('id_monedero_destino',this.form.get('destino').value);
          dataForm.append('id_usuario',this.form.get('id_usuario').value);
          dataForm.append('tipo_operacion',this.form.get('tipo_operacion').value);
          dataForm.append('saldo_actual',this.form.get('saldo_actual').value);
          dataForm.append('agregar',this.form.get('agregar').value);
          dataForm.append('nombre_moneda',this.form.get('moneda').value);
          this.MonedaService.transferenciaSaldo(dataForm).subscribe(
            res => {
              console.log(res);
              if ( res['status'] === 737 ){
                Swal.fire({
                  icon: 'success',
                  timer: 1500,
                  title: 'Se transfirió con exito !.'
                }).then(
                  r=>{
                   this.form.reset();
                   this.route.navigate(['/pantallaprincipal']);
                  })
              }else{
                Swal.fire({
                  icon: 'error',
                  timer: 1500,
                  title: 'Error'
                });
              }
            });
        } else {
          Swal.fire({
            icon: 'error',
            timer: 1500,
            title: 'El monto a transferir no puede ser mayor al actual.'
          })
        }
      }else {
        this.comprobar_origen_destino() ;
        }
    }
  }
}
