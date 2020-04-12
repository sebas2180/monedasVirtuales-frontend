import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.scss']
})
export class BarraSuperiorComponent implements OnInit {

  //iconProfile : boolean = false;
  @Output() changeIconEmitter : EventEmitter<boolean> = new EventEmitter();
  @Output() ver_menu : EventEmitter<boolean> = new EventEmitter();
  @Input() iconProfile : boolean =true;
  @Input() isLogeado : boolean =false;
  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  changeIcon(){
    this.changeIconEmitter.emit(true);
  }
  irPantallaPrincipal(){
    //this.ver_menu.emit(false);
    this.router.navigate(['/']);

  }
  verMenu(){
    if (this.isLogeado){
      this.ver_menu.emit(false);
    }else{
      this.ver_menu.emit(true);
    }
  }

}
