import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generarqr',
  templateUrl: './generarqr.component.html',
  styleUrls: ['./generarqr.component.scss'],
})
export class GenerarqrComponent implements OnInit {
  imagenSrc: string = 'assets/icon/cuadrado.png'; // Ruta inicial de la imagen

  constructor() { }

  ngOnInit() {}

  cambiarImagen() {
    this.imagenSrc = 'assets/icon/Qr.png'; // Cambiar la ruta de la imagen al hacer clic
  }
}
