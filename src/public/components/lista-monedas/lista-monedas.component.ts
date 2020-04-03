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
  constructor(private MonedaService: MonedaService) { 

    this.MonedaService.getMonedas().subscribe(
      res=>{
        console.log(res);
        const aux=(res['monedas']);
        this.monedas= aux;
      }
    )
  }

  ngOnInit(): void {
  }

}
