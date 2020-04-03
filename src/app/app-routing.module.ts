import { ListaMonedasComponent } from '../public/components/lista-monedas/lista-monedas.component';
import { ActualizarCotizacionComponent } from '.././public/components/actualizar-cotizacion/actualizar-cotizacion.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaUsuariosComponent } from 'src/public/components/lista-usuarios/lista-usuarios.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/actualizarCotizacion',
    pathMatch: 'full'
  },
  {
    path: 'actualizarCotizacion',
    component: ActualizarCotizacionComponent
  },
  {
    path: 'listaMonedas',
    component: ListaMonedasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
