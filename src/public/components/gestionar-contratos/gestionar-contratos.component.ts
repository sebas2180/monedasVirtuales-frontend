import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContratoService } from './../../../services/contrato/contrato.service';
import { AuthService } from './../../../services/authService/auth.service';
import { Component, OnInit } from '@angular/core';
import { ContratoModule } from 'src/modelos/contrato/contrato.module';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import  Swal  from 'sweetalert2';
@Component({
  selector: 'app-gestionar-contratos',
  templateUrl: './gestionar-contratos.component.html',
  styleUrls: ['./gestionar-contratos.component.scss']
})
export class GestionarContratosComponent implements OnInit {
  isPrincipal: boolean = false;
  isLogeado: boolean = false;
  verHistorial :boolean = false;
  verMenu: boolean = false;
  isNuevoContrato = false;
  contratos : ContratoModule[] = [];
  tipos_contratos :string[] = ['Bajo riesgo','Medio riesgo','Alto riesgo'];
  form : FormGroup;
  isVerNuevoPago: boolean = false;
  usuario: string='';
  title = 'angular8chartjs';
  canvas: any;
  ctx: any;

  newForm(){
    this.form = new FormGroup({
      tipo_contrato: new FormControl('',[Validators.required]),
      importe: new FormControl('0',[Validators.required,Validators.min(0.000000001)])
    })
  }
  constructor(private AuthService : AuthService,
              private ContratoService : ContratoService,
              private route: Router
              ) {
        this.usuario = this.AuthService.getLocal().split('"')[1];
        this.newForm();
  if ( this.AuthService.isAuthenticatede() ) {
      this.isPrincipal = false;
      this.isLogeado = true;
      this.verMenu = false;
      this.traer_contratos();
      this.setGrafico();
     } else {
      this.route.navigate(['/pantallaprincipal']);
    }

  }
  guardar(){
    if(!this.form.invalid){
      var dataForm = new FormData();
      dataForm.append('id_usuario',this.usuario);
      dataForm.append('eth_recibido',this.form.get('importe').value);
      dataForm.append('tipo_contrato',this.form.get('tipo_contrato').value);
      this.ContratoService.registrarPago(dataForm).subscribe(
        res => {
          if(res['status'] === 772 ){
            this.form.reset();
            Swal.fire({
              icon: 'success',
              title: 'Modificacion correcta',
            });
            this.isVerNuevoPago = false ;
          } else {
            if(res['status'] === 773 ){
              Swal.fire({
                icon: 'error',
                title: 'Hubo un error en la operación',
              });
            }
          }
        },err => {
          console.log(err);
        }
      )
    }

  }
  setGrafico(){

  }
  traer_contratos(){
    const aux = this.AuthService.getLocal().split('"')[1];
      console.log(aux);
    this.ContratoService.getContratos(aux).subscribe(
      res => {
        this.contratos = res['body'] ;
        console.log( this.contratos );
      }
    )
  }
  changeIsPrincipal(e){}
  changeVerMenu(e) {
    if(this.verMenu){
      this.verMenu = false;
    } else {
      this.verMenu = true;
    }
  }
  cerrar_menu(){
      this.verMenu = false;
  }
  change_isNuevoContrato(){
    if ( this.isNuevoContrato ) {
      this.isNuevoContrato = false;
      this.traer_contratos();
    } else {
      this.isNuevoContrato = true;
    }
  }
  change_ver_contrato(e) {
    console.log(e);
  }
  ngOnInit(): void {
    this.canvas =  document.getElementById('myChart');
    this.ctx    =  this.canvas.getContext('2d');
    this.ContratoService.getCantidadContratos(this.usuario).subscribe(
      res => {
        console.log(res);
          let myChart = new Chart(this.ctx, {
          type: 'doughnut',
          data: {
              labels: ["Bajo riesgo", "Medio riesgo", "Alto riesgo"],
              datasets: [{
                  label: 'Monedero',
                  data: [ parseInt(res['bajo']) , parseInt(res['medio']) , parseInt(res['alto']) ],
                  backgroundColor: [
                      'rgb(76, 76, 209);',
                      'rgb(122, 5, 201)',
                      'rgba(255, 206, 86, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
            responsive :true,
            title: {
              display: true,
              text: 'Cantidad de contratos'
            }
          }
          });
         // Chart.defaults.global.defaultFontColor = '#fff';
      },err => {
        console.log(err);
      }
    )
  }

}
