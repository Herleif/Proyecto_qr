import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsuarioAPI } from 'src/app/models/usuarioapi.module'; // Asegúrate de importar tu interfaz

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private usuarioCompletoSubject = new BehaviorSubject<UsuarioAPI | null>(null);
  usuarioCompleto$ = this.usuarioCompletoSubject.asObservable();

  private loginFailedSubject = new BehaviorSubject<boolean>(false);
  loginFailed$ = this.loginFailedSubject.asObservable();

  constructor(private http: HttpClient) {}

  async datosApi(usuario: string, clave: string): Promise<void> {
    const url = 'https://66f873302a683ce9730f7e03.mockapi.io/api/v1/Usuarios';

    // Realizar la solicitud GET
    const res = await this.request<UsuarioAPI[]>('GET', url);

    const user = res.find(u => u.user === usuario && u.password === clave); // Buscar un usuario en la lista de usuarios de la API
    if (user) {
      console.log('Autenticación exitosa!');  // Autenticación exitosa!
      this.isAuthenticatedSubject.next(true); // Activar el estado de autenticación si la autenticación es correcta.
      this.usuarioCompletoSubject.next(user); // Actualizar el usuario completo como objeto del usuario autenticado.
      this.loginFailedSubject.next(false); // Restablecer loginFailed a false
    } else {
      this.isAuthenticatedSubject.next(false); // Desactivar el estado de autenticación si la autenticación es incorrecta.
      this.loginFailedSubject.next(true); // Establecer loginFailed a true si falla la autenticación
    }
  }

  private async request<T>(method: string, url: string): Promise<T> {
    switch (method) {
      case 'GET':
        return this.http.get<T>(url).toPromise();
      // Agregar otros métodos si es necesario (POST, PUT, DELETE, etc.)
      default:
        throw new Error(`Método HTTP no soportado: ${method}`);
    }
  }

  logout(): void {
    this.usuarioCompletoSubject.next(null);
    this.isAuthenticatedSubject.next(false); // Desloguearse y desactivar el estado de autenticación.
    this.loginFailedSubject.next(false);  // Restablecer loginFailed al cerrar sesión
  }
}
