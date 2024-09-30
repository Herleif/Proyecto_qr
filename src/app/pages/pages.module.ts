import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { GenerarqrComponent } from './generarqr/generarqr.component';
import { CursosdocenteComponent } from './cursosdocente/cursosdocente.component';
import { EscanearqrComponent } from './escanearqr/escanearqr.component';
import { RecuperarpasswordComponent } from './recuperarpassword/recuperarpassword.component';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { CursosalumnoComponent } from './cursosalumno/cursosalumno.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
    CursosdocenteComponent,
    EscanearqrComponent,
    GenerarqrComponent,
    RecuperarpasswordComponent,
    CursosalumnoComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    IonicModule,
    FormsModule
  ]
})
export class PagesModule { }
