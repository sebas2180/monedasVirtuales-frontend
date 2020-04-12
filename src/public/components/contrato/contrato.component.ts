import { ContratoService } from './../../../services/contrato/contrato.service';
import { MonedaService } from './../../../services/moneda/moneda.service';
import { Component, OnInit, Input } from '@angular/core';
import { ContratoModule } from 'src/modelos/contrato/contrato.module';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.scss']
})
export class ContratoComponent implements OnInit {
  @Input() contrato : ContratoModule;
  monedero : string ='';
  constructor(private MonedaService: MonedaService,  private ContratoService: ContratoService) { 
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
              console.log(response);
            }
          )

         }else{
           Swal.fire({
             icon: 'error',
             timer: 2200,
            title: 'Debe ser numerico y mayor a cero',
           }).then( res1 =>    {  this.registrar_pago();  })
          
         }
       }
     )
  }
  ngOnInit(): void {
    this.MonedaService.getNombreMonedero(this.contrato.id_monedero).subscribe(
      res => {
        //console.log(res);
        this.monedero = res['body']['monedero'];
      });
  }

}
