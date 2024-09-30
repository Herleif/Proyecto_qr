import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-cursosdocente',
  templateUrl: './cursosdocente.component.html',
  styleUrls: ['./cursosdocente.component.scss'],
})
export class CursosdocenteComponent  implements OnInit {

  usuario: string | null = null; // Variable para almacenar el nombre del usuario

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Suscribirse al observable para obtener el usuario
    this.authService.usuarioCompleto$.subscribe(usuarioCompleto => {
      this.usuario = usuarioCompleto ? usuarioCompleto.user : null; // Asignar el nombre del usuario si existe
    });
  }
}
