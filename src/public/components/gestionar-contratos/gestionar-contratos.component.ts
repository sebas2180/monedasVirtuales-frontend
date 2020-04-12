import { ContratoService } from './../../../services/contrato/contrato.service';
import { AuthService } from './../../../services/authService/auth.service';
import { Component, OnInit } from '@angular/core';
import { ContratoModule } from 'src/modelos/contrato/contrato.module';

@Component({
  selector: 'app-gestionar-contratos',
  templateUrl: './gestionar-contratos.component.html',
  styleUrls: ['./gestionar-contratos.component.scss']
})
export class GestionarContratosComponent implements OnInit {
  isPrincipal: boolean = false;
  isLogeado: boolean = false;
  verMenu: boolean = false;
  isNuevoContrato = false;
  contratos : ContratoModule[] = [];
  constructor(private AuthService : AuthService,
              private ContratoService : ContratoService) {
  if ( this.AuthService.isAuthenticatede ) {
      // alert('true');
      this.isPrincipal = false;
      this.isLogeado = true;
      this.verMenu = false;

      this.traer_contratos();
     } else {
      // alert('false');
    }
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
  ngOnInit(): void {
  }

}
