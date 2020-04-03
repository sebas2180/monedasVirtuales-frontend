import { MonedaModule } from '../../modelos/moneda/moneda.module';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-moneda',
  templateUrl: './moneda.component.html',
  styleUrls: ['./moneda.component.scss']
})
export class MonedaComponent implements OnInit {

  @Input() moneda: MonedaModule;
  constructor() { 
    console.log(this.moneda)
  }

  ngOnInit(): void {
  }

}
