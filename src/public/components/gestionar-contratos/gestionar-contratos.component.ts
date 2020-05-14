import { ManejoFechasService } from './../../../services/manejoFechas/manejo-fechas-service.service';
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
  bajo   = 0;   medio   = 0 ;   alto  = 0 ;
  isLoad: boolean = false ;
  isPrincipal: boolean = false;
  isLogeado: boolean = false;
  verHistorial :boolean = false;
  verMenu: boolean = false;
  isNuevoContrato = false;
  contratos : ContratoModule[] = [];
  contrato : ContratoModule;
  tipos_contratos :string[] = ['Bajo riesgo','Medio riesgo','Alto riesgo'];
  form : FormGroup;
  isVerNuevoPago: boolean = false;
  usuario: string='';
  title = 'angular8chartjs';
  canvas: any;
  ctx: any;
  indicador: boolean = false;

  newForm(){
    this.form = new FormGroup({
      tipo_contrato: new FormControl('',[Validators.required]),
      fecha: new FormControl('',[Validators.required]),
      importe: new FormControl('0',[Validators.required,Validators.min(0.000000001)])
    })
  }
  constructor(public AuthService : AuthService,
              private ContratoService : ContratoService,
              private ManejoFechasService: ManejoFechasService,
              private route: Router
              ) {
        setTimeout(()=>{
          this.traer_contratos();
          this.traerCantidadContratos();
        },10);
        this.usuario = this.AuthService.getLocal().split('"')[1];
        this.newForm();
  if ( this.AuthService.isAuthenticatede() ) {
      this.isPrincipal = false;
      this.isLogeado = true;
      this.verMenu = false;
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
      console.log(this.ManejoFechasService.convertDateToCreateAt(this.form.get('fecha').value));
      dataForm.append('fecha',this.ManejoFechasService.convertDateToCreateAt(this.form.get('fecha').value));
      this.ContratoService.registrarPago(dataForm).subscribe(
        res => {
          if ( res['status'] === 760 ){
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
          if(res['status'] === 772 ){
            this.form.reset();
            Swal.fire({
              icon: 'success',
              title: 'Modificacion correcta',
            });
            this.traer_contratos();
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

  crearGrafico(res){
 
    if(res != null){
      console.log('ES NULL')
    this.bajo =   res['bajo']  ;  this.medio =  res['medio'] ;  this.alto =  res['alto'] ;
    } 
    console.log(res);
    this.canvas =  document.getElementById('myChart');
    this.ctx    =  this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'doughnut',
      data: {
          labels: ["Bajo riesgo", "Medio riesgo", "Alto riesgo"],
          datasets: [{
              label: 'Monedero',
              data: [  this.bajo  ,     this.medio ,   this.alto  ],
              backgroundColor: [
                  'rgb(112, 80, 103)',
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
  }
  traer_contratos(){
    this.contratos = null;
    const aux = this.AuthService.getLocal().split('"')[1];;
    this.ContratoService.getContratos(aux).subscribe(
      res => {
        console.log( 'this.contratos' );
        this.contratos = res['body'] ;
        console.log( this.contratos );
      },err=> {
        console.log(err);
        this.traer_contratos();
      }
    )
  }
 traerCantidadContratos(){
  this.ContratoService.getCantidadContratos(this.usuario).subscribe(
    res => {

      console.log(res);
      if ( res['status'] === 760 ){
        Swal.fire({
          icon: 'warning',
          timer: 1500,
          title: 'Se ha deslogeado por limite de tiempo.'
        }).then(
          r=>{
           this.AuthService.clearLocalStorage();
           this.route.navigate(['/pantallaprincipal']);
          });
        }
      this.isLoad = true;
      this.crearGrafico(res);
       // Chart.defaults.global.defaultFontColor = '#fff';
    },err => {
      console.log(err);
      this.traerCantidadContratos();
      this.crearGrafico(null);
    }
  )
 }
  changeIsPrincipal(e){
    
  }
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
    if(this.verHistorial ) { 
      this.verHistorial = false ;
    }else {
      this.contrato = e;
      console.log( this.contrato);
      this.verHistorial = true ;
    }

  }
  ngOnInit(): void {



  }

}
