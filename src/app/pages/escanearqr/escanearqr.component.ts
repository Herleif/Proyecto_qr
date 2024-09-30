import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-escanearqr',
  templateUrl: './escanearqr.component.html',
  styleUrls: ['./escanearqr.component.scss'],
})
export class EscanearqrComponent implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {}

  async Presente() {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: '¡Haz quedado presente!',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
