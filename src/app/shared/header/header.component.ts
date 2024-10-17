import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false; // Estado de autenticación
  name: string | null = null;

  private authService = inject(AuthService); // Servicio de autenticación
  private router = inject(Router); // Servicio de navegación

  constructor() {}

  ngOnInit() {
    // Suscribirse al estado de autenticación
    this.authService.isAuthenticated$.subscribe(authenticated => {
      this.isAuthenticated = authenticated;
    });

    this.authService.usuarioCompleto$.subscribe(usuarioCompleto => {
      this.name = usuarioCompleto ? usuarioCompleto.user : null;
    });
  }

  logout() {
    this.authService.logout(); // Llamar al método logout del servicio de autenticación
    this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
  }
}
