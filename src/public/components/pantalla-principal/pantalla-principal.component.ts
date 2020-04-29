import { CotizacionModule } from './../../../modelos/cotizacion/cotizacion.module';
import { AuthService } from './../../../services/authService/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pantalla-principal',
  templateUrl: './pantalla-principal.component.html',
  styleUrls: ['./pantalla-principal.component.scss'],
  animations: [
    trigger('state', [
      state(
        'visible',
        style({
          opacity: '1'
        })
      ),
      state(
        'hidden',
        style({
          opacity: '0'
        })
      ),
      transition('* => visible', [animate('500ms ease-out')]),
      transition('visible => hidden', [animate('500ms ease-out')])
    ]),trigger('enterState',[
      state('void',style({
        transform:'translateY(-100%)',
        opacity:0
      })),
      transition(':enter',[
        animate('1s',style({
          transform:'translateY(0)',
        opacity:1
        }))
      ])
    ])
  ]
})
export class PantallaPrincipalComponent implements OnInit {
  cotizacionesUSDBTC: CotizacionModule[];
  estado_login: boolean = false;
  isPrincipal: boolean = false;
  isLogeado: boolean = false;
  verMenu: boolean = false;
  id_usuario: string='';
  isVerEstadisticas : boolean = false;
  constructor(public AuthService: AuthService) {
    if(this.AuthService.isAuthenticatede()) {
      if ( this.AuthService.getLocal() ) {
        this.id_usuario = this.AuthService.getLocal().split('"')[1];
        this.isPrincipal = true;
        this.isLogeado = true;
        this.verMenu = true;
        this.isVerEstadisticas = true;
      }
      
    } else {
      console.log('false');
      this.isPrincipal = false;
      this.isLogeado = false;
      this.verMenu = false;
    }

  }
  getId(){
    return  this.AuthService.getLocal().split('"')[1];
  }
  ngOnInit(): void {
    // if(this.AuthService.isAuthenticatede){
    //     this.isPrincipal = true;
    //     this.isLogeado = true ;
    //     this.estado_login = true;
    // }
  }
  salir(){
 
    this.estado_login = false;
    this.isPrincipal = true;
    this.verMenu=false;
    this.isLogeado = false;
 
  }
  ver_registro() {
    if (this.estado_login) {
      this.estado_login = false;
    }
  }
  ver_login() {
    if(!this.estado_login) {
      this.estado_login = true;
    }
  }
  changeVerMenu(e) {
    if(this.verMenu){
      this.verMenu = false;
    } else {
      this.verMenu = true;
    }
  }
  cerrar_menu(e){
    if(this.verMenu){
      this.verMenu = false;
    } else {
      this.verMenu = true;
    }
  }
  changeIsPrincipal(e) {
    if (!this.isLogeado) {
      if (this.isPrincipal) {
        this.isPrincipal = false;
        this.isLogeado = true;
      } else {
        this.isPrincipal = true;
      }
    } else {
      alert('ver detalles');
    }
  }
  changeUSDBTC(e) {
    this.cotizacionesUSDBTC = e;
  }
}
