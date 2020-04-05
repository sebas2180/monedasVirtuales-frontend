import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.scss']
})
export class BarraSuperiorComponent implements OnInit {

  //iconProfile : boolean = false;
  @Output() changeIconEmitter : EventEmitter<boolean> = new EventEmitter();
  @Input() iconProfile : boolean =true;
  constructor() { }

  ngOnInit(): void {
  }
  changeIcon(){
    this.changeIconEmitter.emit(true);
  }

}
