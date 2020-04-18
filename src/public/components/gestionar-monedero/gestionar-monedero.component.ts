import { AuthService } from './../../../services/authService/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestionar-monedero',
  templateUrl: './gestionar-monedero.component.html',
  styleUrls: ['./gestionar-monedero.component.scss']
})
export class GestionarMonederoComponent implements OnInit {
  isPrincipal: boolean = false;
  isLogeado: boolean = false;
  verMenu: boolean = false;
  constructor(private AuthService : AuthService) {

  if(this.AuthService.isAuthenticatede() ) {
    console.log(this.AuthService.isAuthenticatede() );
    this.isPrincipal = false;
    this.isLogeado = true;
    this.verMenu = false;
  }

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
  changeIsPrincipal(e){}
  ngOnInit(): void {
  }

}
