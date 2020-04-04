import { MonedaModule } from '../../../modelos/moneda/moneda.module';
import { MonedaService } from '../../../services/moneda/moneda.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-actualizar-cotizacion',
  templateUrl: './actualizar-cotizacion.component.html',
  styleUrls: ['./actualizar-cotizacion.component.scss']
})
export class ActualizarCotizacionComponent implements OnInit {

  form: FormGroup;
  monedas: MonedaModule[];
  createForm(){
    this.form = new FormGroup({
      id: new FormControl('',[Validators.required]),
      
      cotizacion: new FormControl('',[Validators.required])
    });
  }
  constructor(private MonedaService: MonedaService) { 

    MonedaService.getMonedas().subscribe(
      res=>{
       const aux=(res['monedas']);
      // aux.forEach(nombre => {
      //   this.tipo_monedas.push(nombre.nombre);
      // });
     
      this.monedas=aux;
      console.log(this.monedas)
      }
    )
    this.createForm();
  }

  ngOnInit(): void {
  }

  enviar(){
    console.log(  this.form.get('id').value);
    if(this.form.invalid){
        alert('falta completar form');
    }else{
      const dataForm = new FormData();
      //dataForm.append('moneda', this.form.get('moneda').value);
       dataForm.append('id', this.form.get('id').value);
      dataForm.append('cotizacion', this.form.get('cotizacion').value);
      this.MonedaService.updateCotizacion(dataForm).subscribe(
        res=>{
          alert('form enviado');
        },
        err=>{
          console.log(err);
        }
      )
    }
  }
}
