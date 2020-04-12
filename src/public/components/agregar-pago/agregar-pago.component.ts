import { trigger, state, transition, animate, style } from '@angular/animations';
import { AuthService } from './../../../services/authService/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-pago',
  templateUrl: './agregar-pago.component.html',
  styleUrls: ['./agregar-pago.component.scss'],
  animations: [
    trigger('enterState',[
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
export class AgregarPagoComponent implements OnInit {
  isPrincipal: boolean = false;
  isLogeado: boolean = false;
  verMenu: boolean = false;
  form : FormGroup;
  constructor(private AuthService : AuthService) { 
  if(this.AuthService.isAuthenticatede){
      // alert('true');
       this.isPrincipal = false;
       this.isLogeado=true;
       this.verMenu=false;
     }else{
      // alert('false');
    }
    this.newForm();
  }
  newForm(){
    this.form= new FormGroup({
      cantidad: new FormControl('',[Validators.required,Validators.min(0)]),
      fecha: new FormControl('',[Validators.required])
    })
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
  ngOnInit(): void {
  }

}
