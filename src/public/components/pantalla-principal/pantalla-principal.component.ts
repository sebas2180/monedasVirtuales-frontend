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
    ])
  ]
})
export class PantallaPrincipalComponent implements OnInit {
  estado_login: boolean = false;
  isPrincipal: boolean = false;
  isLogeado: boolean = false;
  constructor(private AuthService: AuthService) {
    if(this.AuthService.isAuthenticatede){
     // alert('true');
      this.isPrincipal = false;
      this.isLogeado = true;
    }else{
     // alert('false');
    }

  }

  ngOnInit(): void {
  }
  ver_registro(){
    if(this.estado_login){
      this.estado_login=false;
    }
  }
  ver_login(){
    if(!this.estado_login){
      this.estado_login=true;
    }
  }
  changeIsPrincipal(e){
    if(!this.isLogeado){
      if(this.isPrincipal) {
        this.isPrincipal = false;//
        this.isLogeado=true;
      }else{
        this.isPrincipal = true;//
      }
    }else{
      alert('ver detalles');
    }
  }
}
