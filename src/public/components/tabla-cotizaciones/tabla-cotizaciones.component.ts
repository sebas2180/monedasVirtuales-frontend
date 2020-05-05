import { CotizacionModule } from './../../../modelos/cotizacion/cotizacion.module';
import { MatTableDataSource } from '@angular/material/table';
import { CotizacionService } from './../../../services/cotizacion/cotizacion.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
 

@Component({
  selector: 'app-tabla-cotizaciones',
  templateUrl: './tabla-cotizaciones.component.html',
  styleUrls: ['./tabla-cotizaciones.component.scss']
})
export class TablaCotizacionesComponent implements OnInit {
  @Input() cotizaciones:CotizacionModule[];
  @ViewChild(MatSort, { static: false }) sort : MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator : MatPaginator;
  displayedColumns: string[] = ['proveedor','compra','venta','compra_venta','variacionDia','variacionHora'];
  @Input() isOk :boolean = false; 
  titulo : string = '';
  base : string = '';
  
  dataSource ;
  constructor( ) {
 
   }

  ngOnInit(): void {
    if(this.isOk === true ) { 
      console.log(this.cotizaciones)
      this.dataSource = new MatTableDataSource<CotizacionModule>(this.cotizaciones);
      this.titulo = this.cotizaciones[0].name;
      this.base = this.cotizaciones[0].base;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
 
      this.isOk = true;
    }
 
  }

}
