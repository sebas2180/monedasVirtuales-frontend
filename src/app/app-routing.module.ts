import { GestionarContratosComponent } from './../public/components/gestionar-contratos/gestionar-contratos.component';
import { AgregarPagoComponent } from './../public/components/agregar-pago/agregar-pago.component';
import { ListaCotizacionesComponent } from './../public/components/lista-cotizaciones/lista-cotizaciones.component';
import { PantallaPrincipalComponent } from './../public/components/pantalla-principal/pantalla-principal.component';
import { LoginComponent } from '../public/components/login/login.component';
import { ListaMonedasComponent } from '../public/components/lista-monedas/lista-monedas.component';
import { ActualizarCotizacionComponent } from '.././public/components/actualizar-cotizacion/actualizar-cotizacion.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaUsuariosComponent } from 'src/public/components/lista-usuarios/lista-usuarios.component';
import { GuardGuard} from '../services/guard/guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/pantallaprincipal',
    pathMatch: 'full'
  },
  {
    path: 'actualizarCotizacion',
    component: ActualizarCotizacionComponent,
    canActivate:[GuardGuard]
  },
  {
    path: 'listaMonedas',
    component: ListaMonedasComponent,
    canActivate:[GuardGuard]
  },{
    path: 'agregarPago',
    component: AgregarPagoComponent,
    canActivate:[GuardGuard]
  },{
    path: 'gestionarContratos',
    component: GestionarContratosComponent,
    canActivate:[GuardGuard]
  },
  {
    path: 'pantallaprincipal',
    component: PantallaPrincipalComponent
  },
  {
    path: 'cotizaciones',
    component: ListaCotizacionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
