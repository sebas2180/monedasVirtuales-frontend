import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'nuevo-monedero',
  templateUrl: './nuevo-monedero.component.html',
  styleUrls: ['./nuevo-monedero.component.scss']
})
export class NuevoMonederoComponent implements OnInit {
  @Output()  isNuevoMonedero : EventEmitter<boolean>= new EventEmitter;
  color_compra : string ='primary';
  
  constructor() { }

  ngOnInit(): void {
  }
  crear_monedero(){
    this.isNuevoMonedero.emit(true);
  }
}
