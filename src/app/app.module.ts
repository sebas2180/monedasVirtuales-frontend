import { AuthService } from './../services/authService/auth.service';
import { RegistroComponent } from './../public/components/registro/registro.component';
 
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { ListaUsuariosComponent } from '../public/components/lista-usuarios/lista-usuarios.component';
import { UsuarioComponent } from '../public/components/usuario/usuario.component';
import { ActualizarCotizacionComponent } from '.././public/components/actualizar-cotizacion/actualizar-cotizacion.component';
import { ListaMonedasComponent } from '../public/components/lista-monedas/lista-monedas.component';
import { MonedaComponent } from '../public/components/moneda/moneda.component';
import { LoginComponent } from '../public/components/login/login.component';
import { PantallaPrincipalComponent } from './../public/components/pantalla-principal/pantalla-principal.component';
import { BarraSuperiorComponent } from './../public/components/barra-superior/barra-superior.component';

import { MonedaService } from './../services/moneda/moneda.service';
import { UsuarioService  } from './../services/usuarioService/usuario.service';
@NgModule({
  declarations: [
    AppComponent,
    ListaUsuariosComponent,
    UsuarioComponent,
    ActualizarCotizacionComponent,
    ListaMonedasComponent,
    MonedaComponent,
    LoginComponent,
    PantallaPrincipalComponent,
    BarraSuperiorComponent,
    RegistroComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    CdkTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    ReactiveFormsModule
  ],
  exports:[
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [ 
                MonedaService,
              UsuarioService,
              AuthService
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
