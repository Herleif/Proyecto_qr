import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent {
  nombre: string = '';
  usuario: string = '';
  clave: string = '';
  rol: string = 'alumno'; // Valor por defecto
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router
  ) {}

  async registrar() {
    this.isLoading = true;

    try {
      // Verificar si el usuario ya existe
      const existe = await this.authService.verificarUsuarioExistente(this.usuario);
      if (existe) {
        this.isLoading = false;
        await this.mostrarAlerta('Error', 'El nombre de usuario ya está en uso.');
      } else {
        // Registrar el nuevo usuario
        await this.authService.registrarUsuario(this.usuario, this.clave, this.nombre, this.rol);
        this.isLoading = false;
        // Mostrar alerta de éxito
        await this.mostrarAlerta('Éxito', '¡Registrado correctamente!');
        // Redirigir a la página de inicio de sesión después de la confirmación
        this.router.navigate(['/login']);
      }
    } catch (error) {
      this.isLoading = false;
      await this.mostrarAlerta('Error', 'Ocurrió un error durante el registro.');
    }
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
