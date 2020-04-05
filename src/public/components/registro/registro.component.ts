import { UsuarioService } from './../../../services/usuarioService/usuario.service';
import { FormGroup, FormControl, Validators, ValidatorFn, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  form: FormGroup;
  constructor(private formBuilder: FormBuilder,private UsuarioService: UsuarioService) { 
    
  }
  newForm(){
    this.form = this.formBuilder.group({
      usuario: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      password2: new FormControl('',[Validators.required])
    }, {
      validator: this.MustMatch('password', 'password2')
  } );
  }

 
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
  get f() { return this.form.controls; }


  ngOnInit(): void {
    this.newForm();
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
  }
  }
 
  registrar(){
    if(!this.form.invalid){
      const dataForm = new FormData;
      dataForm.append('usuario',this.form.get('usuario').value);
      dataForm.append('password',this.form.get('usuario').value);
      this.UsuarioService.signup(dataForm).subscribe(
       resp =>{
         console.log(resp['status']);
        const status = resp['status'];
        // tslint:disable-next-line: triple-equals
        if(status == 750) {
            Swal.fire({
            icon: 'error',
            timer: 1500,
            title: resp['msj']
          });
        }
        if(status == 753) {
          Swal.fire({
            icon: 'success',
            timer: 1500,
            title: resp['msj']
          });
        }
       },
      
       err=>{

       }
     )
    }

  }
 
  verificarPasswords() : ValidatorFn {
    if(!this.form.get('password').invalid){
      if(this.form.get('password').value != this.form.get('password2').value){
        // alert('diferentes');
         return null;
       }
    }

  }
}
