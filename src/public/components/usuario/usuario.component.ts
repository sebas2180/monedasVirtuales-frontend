import { UsuarioModelModule } from '../../../modelos/usuario-model/usuario-model.module';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  @Input() usuario: UsuarioModelModule;
  constructor() { }

  ngOnInit(): void {
  }

}
