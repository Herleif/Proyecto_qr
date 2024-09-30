import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usuario: string = ''; // Campo de entrada para el usuario
  clave: string = ''; // Campo de entrada para la clave

  private authService = inject(AuthService);  // Obtener el servicio de autenticación
  private router = inject(Router);  // Obtener el servicio de navegación

  loginFailed: boolean = false; // Variable para almacenar el estado de loginFailed
  isLoading: boolean = false; // Variable para manejar el estado de carga

  ngOnInit(): void {
    this.authService.loginFailed$.subscribe(loginFailed => this.loginFailed = loginFailed); // Obtener el estado de loginFailed
  }

  async login(usuario: string, clave: string) {
    this.isLoading = true; // Activar el estado de carga
    await this.authService.datosApi(usuario, clave); // Intentar hacer login
    this.isLoading = false; // Desactivar el estado de carga

    // Suscribirse al observable para verificar el estado de autenticación
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.authService.usuarioCompleto$.subscribe(usuarioCompleto => {
          this.usuario = ''; // Limpiar el campo de usuario
          this.clave = ''; // Limpiar el campo de clave

          // Redirigir según el rol del usuario
          if (usuarioCompleto.rol === "profesor") {
            this.router.navigate(['/cursosdocente']); // Redirigir al usuario docente
          } else {
            this.router.navigate(['/cursosalumno']); // Redirigir al usuario alumno
          }
        });
      } else {
        this.loginFailed = true; // Mostrar mensaje de error si el login falla
      }
    });
  }
}
