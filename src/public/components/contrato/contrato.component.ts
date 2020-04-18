import { CotizacionService } from './../../../services/cotizacion/cotizacion.service';
import { ContratoService } from './../../../services/contrato/contrato.service';
import { MonedaService } from './../../../services/moneda/moneda.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContratoModule } from 'src/modelos/contrato/contrato.module';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.scss']
})
export class ContratoComponent implements OnInit {
  @Input() contrato : ContratoModule;
  @Output() emit_ver_historial = new EventEmitter;
  cotizacionETHUSD : number = 0;
   ganancia : number = 0;
  constructor(private MonedaService: MonedaService,  private ContratoService: ContratoService,
              private CotizacionService : CotizacionService) { 
  }
  activar(){
    Swal.fire({
      title: 'Estas por activar este contrato',
      text: "Confirmas la acción?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Claro!'
    }).then((result) => {
      if (result.value) {
        this.ContratoService.activarContrato(this.contrato.id, this.contrato.id_usuario).subscribe(
          res => {
            console.log(res);
            Swal.fire(
              'success!'
            ).then(
              res => {
                this.contrato.status = 'Activo';
              }
            )
          }
        )
      }
    })
  }
  registrar_pago() {
    Swal.fire({
      input: 'text',
      title: 'Ingrese la cantidad recibida',
        inputValue: '0.0',
        showCancelButton: true
      })
     .then(
       res=>{ 
         console.log(res);
         if(res.value>0) {
          var dataForm = new FormData;
          dataForm.append('id_usuario',this.contrato.id_usuario.toString());
          dataForm.append('id',this.contrato.id.toString());
          dataForm.append('eth_recibido',res.value.toString());
          dataForm.append('id_monedero',this.contrato.id_monedero.toString());
          this.ContratoService.registrarPago(dataForm).subscribe(
            response => {
              this.contrato.eth_recibido =  this.contrato.eth_recibido + parseFloat(res.value);
              this.contrato.pagos_registrados++;
              this.ganancia =( (this.contrato.eth_recibido*100)/parseFloat(this.contrato.eth_pagado));
              Swal.fire({
                icon: 'success',
                title:'Agregado con exito'
              }
              )
            }
          )
         }else{
           if(res.dismiss === Swal.DismissReason.cancel){
            Swal.fire(
              'Cancelado' 
            )
           }else{
            Swal.fire({
              icon: 'error',
              timer: 2200,
             title: 'Debe ser numerico y mayor a cero',
            }).then( res1 =>    {  
              this.registrar_pago();  
            })

           }
         }
       }
     )
  }
  ver_historial() {
    this.emit_ver_historial.emit(this.contrato);
  }
  ngOnInit(): void {
    //debo enocntrar una web donde agarrar ETH en dolares y luego en botizacionservice hacer el observable para luegp
    //agarrarlo aca y mustrar ese valor 
    //this.CotizacionService.cbit
    this.ganancia =( (this.contrato.eth_recibido*100)/parseFloat(this.contrato.eth_pagado));
    // this.MonedaService.getNombreMonedero(this.contrato.id_monedero.toString()).subscribe(
    //   res => {
    //     console.log(res);
    //     this.monedero = res['body']['monedero'];
    //   });
  }

}
