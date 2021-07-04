import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';

const routes: Routes = [
  { path: 'novo', component: FormularioComponent },
  { path: 'editar/:id', component: FormularioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
