import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComponent } from 'src/app/computadores/lista/lista.component';
import { FormularioComponent } from './computadores/formulario/formulario.component';
import { ComputadorResolverGuard } from './computadores/guards/computador-resolver.guard';

const routes: Routes = [
  { path: '', component: ListaComponent },
  { path: 'novo', component: FormularioComponent, resolve: { computador: ComputadorResolverGuard } },
  { path: 'editar/:id', component: FormularioComponent, resolve: { computador: ComputadorResolverGuard } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
