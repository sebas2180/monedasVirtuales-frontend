import { AuthService } from '../../../services/authService/auth.service';
import { Router } from '@angular/router';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
  ,
  animations:[
    trigger('enterState',[
      state('void',style({
        transform:'translateY(-100%)',
        opacity:0
      })),
      transition(':enter',[
        animate('0.5s',style({
          transform:'translateY(0)',
        opacity:1
        }))
      ])
    ])
  ]
})
export class MenuComponent implements OnInit {
  @Output() cerrar_menu : EventEmitter<boolean> = new EventEmitter();
  @Output() out_salir : EventEmitter<boolean> = new EventEmitter();
  @Output() cancel_subscriptions : EventEmitter<boolean> = new EventEmitter();
  centered = false;
  disabled = false;
  unbounded = false;
  mycolor:string='green';
  radius: number;
  color: string;
  constructor(private route : Router,private AuthService : AuthService) { }

  ngOnInit(): void {
  }
  misMonederos(){
    this.cerrar_menu.emit();
    this.cancel_subscriptions.emit(true);
    this.route.navigate(['/pantallaprincipal']);
  }
  cotizaciones(){
    this.cerrar_menu.emit();
    this.cancel_subscriptions.emit(true);
    this.route.navigate(['/cotizaciones']);
  }
  agregarPago(){
    this.cerrar_menu.emit();
    this.cancel_subscriptions.emit(true);
    this.route.navigate(['/agregarPago']);
    
  }
  salir(){
    console.log('salir')
    this.AuthService.clearLocalStorage();
    this.out_salir.emit();
    this.cancel_subscriptions.emit(true);
    this.route.navigate(['/']);
 
    
  }
  gestionarMonederos(){
    this.cancel_subscriptions.emit(true);
    this.cerrar_menu.emit();
    this.route.navigate(['/gestionarMonederos']);
    
  }
  menuPrincipal(){
    this.cancel_subscriptions.emit(true);
    this.cerrar_menu.emit();
    this.route.navigate(['/pantallaprincipal']);
  }
  gestionarContratos(){
    this.cancel_subscriptions.emit(true);
    this.cerrar_menu.emit();
    this.route.navigate(['/gestionarContratos']);
  }

}
