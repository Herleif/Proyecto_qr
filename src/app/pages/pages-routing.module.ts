import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CursosdocenteComponent } from './cursosdocente/cursosdocente.component';
import { EscanearqrComponent } from './escanearqr/escanearqr.component';
import { GenerarqrComponent } from './generarqr/generarqr.component';
import { RecuperarpasswordComponent } from './recuperarpassword/recuperarpassword.component';
import { CursosalumnoComponent } from './cursosalumno/cursosalumno.component';
import { RegistrarComponent } from './registrar/registrar.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cursosdocente', component: CursosdocenteComponent },
  { path: 'escanearqr', component: EscanearqrComponent },
  { path: 'generarqr', component: GenerarqrComponent },
  { path: 'recuperarpassword', component: RecuperarpasswordComponent },
  { path: 'cursosalumno', component: CursosalumnoComponent },
  { path: 'registrar', component: RegistrarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
