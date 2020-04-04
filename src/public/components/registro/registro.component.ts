import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  form: FormGroup;

  newForm(){
    this.form = new FormGroup({
      usuario: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      password2: new FormControl('',[Validators.required])
    });
  }
  constructor() { 
    this.newForm();
  }

  ngOnInit(): void {
  }

  registrar(){

  }
}
