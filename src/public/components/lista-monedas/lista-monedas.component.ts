import { MonedaModule } from './../../modelos/moneda/moneda.module';
import { MonedaService } from './../../services/moneda/moneda.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-monedas',
  templateUrl: './lista-monedas.component.html',
  styleUrls: ['./lista-monedas.component.scss']
})
export class ListaMonedasComponent implements OnInit {
    monedas: MonedaModule[];
  constructor(private MonedaService : MonedaService) {

  }

  ngOnInit(): void {
    this.MonedaService.getMonedas().subscribe(
      res => {
        const aux = (res['monedas']);
        this.monedas = aux;
      }
      );
  }

}
