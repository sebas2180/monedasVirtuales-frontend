import { UsuarioService } from '../../../services/usuarioService/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  newForm(){
    this.form = new FormGroup({
      usuario: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
  }
  constructor(private UsuarioService: UsuarioService) { 
    this.newForm();
  }

  ngOnInit(): void {
  }
  entrar(){
    if(!this.form.invalid){
      const dataForm = new FormData;
      dataForm.append('usuario',this.form.get('usuario').value);
      dataForm.append('password',this.form.get('password').value);
      this.UsuarioService.login(dataForm).subscribe(
        res=>{
          console.log(res['success']);
          if(res['status']==702){
            Swal.fire({
              icon: 'error',
              timer: 1500,
              title: res['success']
            });
          }else{
            if(res['status']==703){
              Swal.fire({
                icon: 'success',
                timer: 1500,
                title: res['success']
              });
            }
          }
        },
        err=>{
          console.log(err);
        }
      )
    }else{
      alert('galta');
    }


  }

}
