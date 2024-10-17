import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { WebService } from 'src/app/servicios/web.service';

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
  registroFallido: boolean = false;
  usuarioEnUso: boolean = false;

  constructor(private authService: AuthService) {}

  async registrar() {
    this.isLoading = true;
    this.registroFallido = false;
    this.usuarioEnUso = false;

    try {
      // Verificar si el usuario ya existe
      const existe = await this.authService.verificarUsuarioExistente(this.usuario);
      if (existe) {
        this.usuarioEnUso = true;
      } else {
        // Registrar el nuevo usuario
        await this.authService.registrarUsuario(this.usuario, this.clave, this.nombre, this.rol);
        // Puedes redirigir a la página de inicio de sesión o mostrar un mensaje de éxito
      }
    } catch (error) {
      this.registroFallido = true; // Manejar error de registro
    } finally {
      this.isLoading = false;
    }
  }
}

