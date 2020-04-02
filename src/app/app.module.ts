import { ListaUsuariosService } from './../public/services/listaUsuarioService/lista-usuarios.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaUsuariosComponent } from '../public/components/lista-usuarios/lista-usuarios.component';
import { UsuarioComponent } from '../public/components/usuario/usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaUsuariosComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ ListaUsuariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
