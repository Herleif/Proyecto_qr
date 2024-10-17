import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { AlertController } from '@ionic/angular';

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
  private alertController = inject(AlertController); // Inyección del AlertController

  isLoading: boolean = false; // Variable para manejar el estado de carga
  isLoggingOut: boolean = false; // Nueva propiedad para controlar si se está cerrando sesión

  ngOnInit(): void {
    this.authService.loginFailed$.subscribe(loginFailed => {
      if (loginFailed) {
        this.mostrarAlerta('Error', 'Usuario o clave incorrectos.');
      }
    }); // Obtener el estado de loginFailed
  }

  async login(usuario: string, clave: string) {
    this.isLoading = true; // Activar el estado de carga
    this.isLoggingOut = false; // Asegurarse de que no es un logout
    await this.authService.datosApi(usuario, clave); // Intentar hacer login
    this.isLoading = false; // Desactivar el estado de carga

    // Suscribirse al observable para verificar el estado de autenticación
    this.authService.isAuthenticated$.subscribe(async isAuthenticated => {
      if (isAuthenticated) {
        this.authService.usuarioCompleto$.subscribe(usuarioCompleto => {
          this.usuario = ''; // Limpiar el campo de usuario
          this.clave = ''; // Limpiar el campo de clave

          // Redirigir según el rol del usuario
          if (usuarioCompleto.rol === 'profesor') {
            this.router.navigate(['/cursosdocente']); // Redirigir al usuario docente
          } else {
            this.router.navigate(['/cursosalumno']); // Redirigir al usuario alumno
          }
        });
      }
    });
  }

  // Función para mostrar las alertas
  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
