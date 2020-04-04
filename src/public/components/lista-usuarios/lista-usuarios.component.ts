import { UsuarioService } from '../../../services/usuarioService/usuario.service';
import { UsuarioModelModule } from '../../../modelos/usuario-model/usuario-model.module';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {
  ok:boolean = false;
  usuarios: UsuarioModelModule[];
  constructor(private UsuarioService: UsuarioService) { 

    this.UsuarioService.getUsuarios().subscribe(
      res=>{
        this.usuarios = res['bancos'];
        console.log(this.usuarios);
        this.ok=true;
      }
    )
  }

  ngOnInit(): void {
  }

}
