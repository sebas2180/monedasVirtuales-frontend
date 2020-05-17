import { CotizacionService } from './../../../services/cotizacion/cotizacion.service';
import { MonedaModule } from './../../../modelos/moneda/moneda.module';
import { MonedaService } from './../../../services/moneda/moneda.service';
import { DatePipe } from '@angular/common';
import { AuthService } from './../../../services/authService/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {  Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import  Swal  from 'sweetalert2';
import { interval } from 'rxjs';

@Component({
  selector: 'nuevo-saldo',
  templateUrl: './nuevo-saldo.component.html',
  styleUrls: ['./nuevo-saldo.component.scss']
})
export class NuevoSaldoComponent implements OnInit {
  color_compra: string = 'primary';
  color_movimiento: string = 'primary';
  color_venta: string = 'primary';
  form: FormGroup;
  form2: FormGroup;
  form3: FormGroup;
  fechaActual =  Date.now();
  pipe = new DatePipe('en-US');
  tipo_moneda : string[] = ['Bitcoin' , 'Ethereum' , 'Litecoin'];
  tipo_monederos : string[] = [''];
  fechaConvertida  = this.pipe.transform(this.fechaActual , 'yyy-MM-dd');
  isNuevoMonedero: number = 1 ;
  monedaAuxiliar : MonedaModule ;
  saldoActual : number = 0;
  precio_compra_ETH : number = 0;
  precio_venta_ETH: number = 0;
  precio_compra_BTC : number = 0;
  precio_venta_BTC: number = 0;
  isMovimiento : boolean = false;
  isCompraVenta : boolean = false;
  newForm(){
    var usuario = this.AuthService.getLocal().split('"')[1];
    this.form = new FormGroup({
      tipo_operacion: new FormControl('Compra', [ Validators.required]),
      moneda: new FormControl('', [ Validators.required]),
      salgo_agregado: new FormControl('', [ Validators.required , Validators.min(0)]),
      id_usuario: new FormControl(usuario, [ Validators.required]),
      nombreMonedero: new FormControl('', [ Validators.required]),
      fechaActual: new FormControl(this.fechaConvertida),
    });
    this.form2 = new FormGroup({
      nombre: new FormControl('', [ Validators.required , Validators.minLength(4)]),
    });
    this.form3 = new FormGroup({
      is_inversion: new FormControl('', [ Validators.required]),
      id_monedero: new FormControl(' ', [ Validators.required ] ),
      saldo_actual: new FormControl('0', [ Validators.required , Validators.min(-10)]),
      agregar: new FormControl('0', [ Validators.required, Validators.min(0)]),
      nuevo_saldo: new FormControl('0', [ Validators.required , Validators.min(0)]),
      cotizacion_USD: new FormControl('0', [ Validators.required , Validators.min(0.001)])
    });  }
  constructor( private AuthService : AuthService,
                private MonedaService: MonedaService,
                private route: Router,
                private CotizacionService : CotizacionService ) {
    interval(60000).subscribe(
      resp0 => {
        this.CotizacionService.CcoinbaseUSDETH.subscribe( cotizacion =>{
          this.precio_compra_ETH = cotizacion.compra;
          this.precio_venta_ETH = cotizacion.venta*0.96;
        });
        this.CotizacionService.CbitstampUSDBTC.subscribe( cotizacionBTC =>{
          this.precio_compra_BTC = cotizacionBTC.compra;
          this.precio_venta_BTC = cotizacionBTC.venta;
        });
      }
    )
    this.newForm();

  }
  ngOnInit(): void {
   
  }
  buscar_monederos() {
    const moneda = (this.form.get('moneda').value);
    this.tipo_monederos = [''];
    this.MonedaService.getNombreMonedas(this.AuthService.getLocal(),moneda).subscribe(
      res => {
        console.log(res);
        for (let index = 0; index < 20; index++) {
          if(res['body'][index]) {
            var encontrado: boolean = false;
            this.tipo_monederos.forEach(element => {
              if (element == res['body'][index]['monedero']){ encontrado = true;
              }
            });
            if( !encontrado ) {
              this.tipo_monederos.push(res['body'][index]['monedero']);
            }
          }
        }
        this.tipo_monederos.push('+ Nuevo monedero');
      }
    );
  }
  esNuevo_monedero() {
    if(this.form.get('nombreMonedero').value === '+ Nuevo monedero') {
      this.isNuevoMonedero = 2 ;
    }
  }
  siguiente() {
    this.isNuevoMonedero = 3 ;
    var nombreMonedero = '';
    if (this.form.get('nombreMonedero').value != ''){
      nombreMonedero = this.form.get('nombreMonedero').value ;
    } else {
      nombreMonedero = this.form2.get('nombre').value ;
    }
    console.log('siguienteeeee')
    this.MonedaService.getMoneda(this.form.get('id_usuario').value, this.form.get('moneda').value, nombreMonedero).subscribe(
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
          console.log(this.monedaAuxiliar );
          this.monedaAuxiliar =  res['body']['moneda'] ;
          console.log(  this.monedaAuxiliar ) ;
          this.saldoActual = this.monedaAuxiliar.importe;
          this.form3.patchValue( { 'saldo_actual' : this.monedaAuxiliar.importe } );
          this.form3.patchValue( { 'nuevo_saldo' :  this.monedaAuxiliar.importe } );
          this.form3.patchValue( { 'id_monedero' :  this.monedaAuxiliar.id } );
        }
      }
    )
  }
  
  guardar() { 
     
    if(this.form.get('tipo_operacion').value === ('Venta' || 'Transferencia' )) {
      this.form3.patchValue( { 'is_inversion' :'false' } );
      console.log(this.form3.get('is_inversion').value);
    } else {
      console.log(this.form3.get('is_inversion'));
    }
    if ( !this.form3.invalid) {
 
      if (this.form.get('nombreMonedero').value != '+ Nuevo monedero'){ 
        var dataForm = new FormData();
        dataForm.append('id_monedero',this.form3.get('id_monedero').value );
        dataForm.append('importe', this.form3.get('nuevo_saldo').value );
        dataForm.append('nombre',this.form.get('moneda').value );
        dataForm.append('tipo_operacion',this.form.get('tipo_operacion').value );
        dataForm.append('id_usuario',this.form.get('id_usuario').value );
        dataForm.append('monto_operacion',this.form3.get('agregar').value );
        dataForm.append('cotizacion_usd',this.form3.get('cotizacion_USD').value );
        dataForm.append('is_inversion',this.form3.get('is_inversion').value );
        dataForm.append('agrega_montos','true');
        this.MonedaService.updateImporte(dataForm).subscribe(
          res => {
              if ( res['status'] == 754 ) {
            Swal.fire({
              icon: 'success',
              title: 'Modificacion correcta',
            });
            this.reset();
           }else {
            Swal.fire({
              icon: 'error',
              title: 'Hubo un error al actualizar el importe',
            });
           }
          }, err => {
            Swal.fire({
              icon: 'error',
              title: 'Hubo un error al actualizar el importe',
            });

          }
        )
      } else {
        console.log(this.form3.get('is_inversion').value )
        var dataForm = new FormData();
        dataForm.append('importe', this.form3.get('nuevo_saldo').value );
        dataForm.append('is_inversion',this.form3.get('is_inversion').value );
        dataForm.append('id_usuario',this.form.get('id_usuario').value );
        dataForm.append('monedero',this.form2.get('nombre').value );
        dataForm.append('nombre',this.form.get('moneda').value );
        dataForm.append('tipo_operacion',this.form.get('tipo_operacion').value );
        dataForm.append('monto_operacion',this.form3.get('agregar').value );
        dataForm.append('cotizacion_usd',this.form3.get('cotizacion_USD').value );
        dataForm.append('agrega_montos','true');
        this.MonedaService.addMoneda(dataForm).subscribe(
          res => {
            if ( res['status'] == 752 ) {
          Swal.fire({
            icon: 'success',
            title: 'Billetera agregada correctamente.',
          });
          this.reset();
         }else {
          Swal.fire({
            icon: 'error',
            title: 'Hubo al agregar la billetera.',
          });
         }
        }, err => {
          Swal.fire({
            icon: 'error',
            title:  'Hubo al agregar la billetera.',
          });

        }
        )
      }

    }
  }
  modificarSaldo(){
        this.form3.patchValue( { 'nuevo_saldo' :  this.saldoActual } );
        if(this.form.get('tipo_operacion').value === 'Compra')  {
          var cuenta = parseFloat( this.form3.get('saldo_actual').value) + parseFloat( this.form3.get('agregar').value );
        } else {
          var cuenta = parseFloat( this.form3.get('saldo_actual').value) - parseFloat( this.form3.get('agregar').value );
        }
        this.form3.patchValue( { 'nuevo_saldo' : cuenta.toString() } );
      
    
  }
  modificarSaldoFinal() {

    this.form3.patchValue( { 'saldo_actual' : this.saldoActual } );
    if(this.form.get('tipo_operacion').value === 'Compra')  {
      var cuenta = parseFloat( this.form3.get('nuevo_saldo').value) - parseFloat( this.form3.get('saldo_actual').value );
    } else{
      var cuenta = parseFloat( this.form3.get('nuevo_saldo').value) + parseFloat( this.form3.get('saldo_actual').value );
    }
    this.form3.patchValue( { 'agregar' : cuenta.toString() } );
  
  }
  movimiento() {
    this.form.patchValue( { 'tipo_operacion' : 'Movimiento' } );
    this.color_movimiento = 'primary';
    this.color_compra = 'basic';
    this.color_venta = 'basic';
    this.isCompraVenta = false;
    this.isMovimiento = true;
  }
  compra(){
    this.form.patchValue( { 'tipo_operacion' : 'Compra' } );
    this.color_compra = 'primary';
    this.color_movimiento = 'basic';
    this.color_venta = 'basic';
    this.isCompraVenta = true;
    this.isMovimiento = false;
    if  (this.form.get('moneda').value === 'Bitcoin') {
      this.form3.patchValue({'cotizacion_USD' : this.precio_compra_BTC});
    }
    if  (this.form.get('moneda').value === 'Ethereum') {
      this.form3.patchValue({'cotizacion_USD' : this.precio_compra_ETH});
    }
    if ( this.form3.get('agregar').value > 0 ){
      this.modificarSaldo();
    }
  }
  venta(){
    this.form.patchValue( { 'tipo_operacion' : 'Venta' } );
    this.color_compra = 'basic';
    this.color_movimiento = 'basic';
    this.color_venta = 'primary';
    this.isCompraVenta = true;
    this.isMovimiento = false;
    console.log(this.form.get('moneda').value);
    console.log(this.precio_venta_BTC);
    if  (this.form.get('moneda').value === 'Bitcoin') {
      this.form3.patchValue({'cotizacion_USD' : this.precio_venta_BTC});
    }
    if  (this.form.get('moneda').value === 'Ethereum') {
      this.form3.patchValue({'cotizacion_USD' : this.precio_venta_ETH});
    }
    if ( this.form3.get('agregar').value > 0 ){
      this.modificarSaldo();
    }
  }
  reset(){
    this.newForm();
    this.isNuevoMonedero = 1;
  }
}
