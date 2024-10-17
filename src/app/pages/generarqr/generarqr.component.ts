import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-generarqr',
  templateUrl: './generarqr.component.html',
  styleUrls: ['./generarqr.component.scss'],
})
export class GenerarqrComponent implements OnInit {
  imagenSrc: string = 'assets/icon/cuadrado.png'; // Ruta inicial de la imagen
  fechaActual: string = '';
  horaActual: string = '';

  constructor() {}

  ngOnInit() {
    this.actualizarFechaHora(); // Llama a la función para establecer la hora actual al iniciar
    setInterval(() => {
      this.actualizarFechaHora(); // Actualiza la hora cada segundo
    }, 1000);
  }

  actualizarFechaHora() {
    const ahora = new Date();
    // Formatea la fecha y hora (puedes personalizar el formato según tu necesidad)
    this.fechaActual = ahora.toLocaleDateString(); // Ejemplo: "16/10/2024"
    this.horaActual = ahora.toLocaleTimeString(); // Ejemplo: "14:31:45"
  }

  cambiarImagen() {
    const randomId = Math.random().toString(36).substring(2, 15);
    const data = `Registro-${randomId}`;
    QRCode.toDataURL(data, (err: Error | null, url: string) => {
      if (err) {
        console.error('Error al generar el QR', err);
        return;
      }
      this.imagenSrc = url;
    });
  }
}
