
import { ContratoService } from './../services/contrato/contrato.service';
import { NuevoContratoComponent } from './../public/components/nuevo-contrato/nuevo-contrato.component';
import { GestionarContratosComponent } from './../public/components/gestionar-contratos/gestionar-contratos.component';
import { AgregarPagoComponent } from './../public/components/agregar-pago/agregar-pago.component';
import { MenuComponent } from './../public/components/menu/menu.component';


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
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatRippleModule } from '@angular/material/core';

import { AppComponent } from './app.component';
import { ListaUsuariosComponent } from '../public/components/lista-usuarios/lista-usuarios.component';
import { UsuarioComponent } from '../public/components/usuario/usuario.component';
import { ActualizarCotizacionComponent } from '.././public/components/actualizar-cotizacion/actualizar-cotizacion.component';
import { ListaMonedasComponent } from '../public/components/lista-monedas/lista-monedas.component';
import { MonedaComponent } from '../public/components/moneda/moneda.component';
import { LoginComponent } from '../public/components/login/login.component';
import { PantallaPrincipalComponent } from './../public/components/pantalla-principal/pantalla-principal.component';
import { BarraSuperiorComponent } from './../public/components/barra-superior/barra-superior.component';
import { RegistroComponent } from './../public/components/registro/registro.component'; 
import { ListaCotizacionesComponent } from './../public/components/lista-cotizaciones/lista-cotizaciones.component';
import { CotizacionComponent } from './../public/components/cotizacion/cotizacion.component';
import { NuevoSaldoComponent } from './../public/components/nuevo-saldo/nuevo-saldo.component';

import { GuardGuard } from './../services/guard/guard.guard';
import { CotizacionService  } from './../services/cotizacion/cotizacion.service';
import { MonedaService } from './../services/moneda/moneda.service';
import { AuthService } from './../services/authService/auth.service';
import { UsuarioService  } from './../services/usuarioService/usuario.service';
import {  TokenInterceptorService  } from './../services/token-interceptor/token-interceptor.service';
import { ContratoComponent } from 'src/public/components/contrato/contrato.component';
import { GestionarMonederoComponent } from '../public/components/gestionar-monedero/gestionar-monedero.component';
import { HistorialPagosComponent } from '../public/components/historial-pagos/historial-pagos.component';
import { EstadisticasCompraComponent } from '../public/components/estadisticas-compra/estadisticas-compra.component';
import { EstadisticasContratosComponent } from '../public/components/estadisticas-contratos/estadisticas-contratos.component';
import { LoaderComponent } from '../public/components/loader/loader.component';
import { ViewEstadisticaCompraComponent } from '../public/components/view-estadistica-compra/view-estadistica-compra.component';
import { LogosProveedoresComponent } from '../public/components/logos-proveedores/logos-proveedores.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { VerCotizacionesComponent } from '../public/components/ver-cotizaciones/ver-cotizaciones.component';
import { TransferenciaSaldoComponent } from '../public/components/transferencia-saldo/transferencia-saldo.component';
@NgModule({
  declarations: [
    AppComponent,
    AgregarPagoComponent,
    ListaUsuariosComponent,
    UsuarioComponent,
    ActualizarCotizacionComponent,
    ListaMonedasComponent,
    MonedaComponent,
    LoginComponent,
    PantallaPrincipalComponent,
    BarraSuperiorComponent,
    RegistroComponent,
    CotizacionComponent,
    ListaCotizacionesComponent,
    MenuComponent,
    GestionarContratosComponent,
    ContratoComponent,
    NuevoContratoComponent,
    GestionarMonederoComponent,
    NuevoSaldoComponent,
    HistorialPagosComponent,
    EstadisticasContratosComponent,
    EstadisticasCompraComponent,
    LoaderComponent,
    ViewEstadisticaCompraComponent,
    LogosProveedoresComponent,
    VerCotizacionesComponent,
    TransferenciaSaldoComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  
    MatRippleModule,
    RouterModule,
    BrowserAnimationsModule,
    CdkTableModule,
    CarouselModule,
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
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  exports:[
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [ 
              MonedaService,
              UsuarioService,
              CotizacionService,
              AuthService,
              ContratoService,
      
              GuardGuard,
              {
                provide: HTTP_INTERCEPTORS,
                useClass: TokenInterceptorService,
                multi: true
              }
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
