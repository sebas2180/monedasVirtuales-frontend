import { MonedaService } from './../../services/moneda/moneda.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-actualizar-cotizacion',
  templateUrl: './actualizar-cotizacion.component.html',
  styleUrls: ['./actualizar-cotizacion.component.scss']
})
export class ActualizarCotizacionComponent implements OnInit {

  form: FormGroup;
  tipo_monedas: string[]=[''];
  createForm(){
    this.form = new FormGroup({
      id: new FormControl('7',[Validators.required]),
      moneda: new FormControl('BITCOIN',[Validators.required]),
      cotizacion: new FormControl('',[Validators.required])
    });
  }
  constructor(private MonedaService: MonedaService) { 

    MonedaService.getMonedas().subscribe(
      res=>{
       const aux=(res['monedas']);
      aux.forEach(nombre => {
        this.tipo_monedas.push(nombre.nombre);
      });
      console.log(this.tipo_monedas)
      }
    )
    this.createForm();
  }

  ngOnInit(): void {
  }

  enviar(){

    if(this.form.invalid){
        alert('falta completar form');
    }else{
      const dataForm = new FormData();
      dataForm.append('moneda', this.form.get('moneda').value);
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
