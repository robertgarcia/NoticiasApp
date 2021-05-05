import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() index: number;
  @Input() enFavoritos = false;
  constructor( private iab: InAppBrowser,
               private actionSheetCrtl: ActionSheetController,
               private socialSharing: SocialSharing,
               private serviceDataLocal: DataLocalService ) { }

  ngOnInit() {}

  abrirNoticia() {
    const browser = this.iab.create( this.noticia.url, '_system' );
    browser.show();
  }

  async lanzarMenu() {
    let btnNoFav;
    if ( this.enFavoritos ){
      btnNoFav = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar Favorito');
          this.serviceDataLocal.borrarNoticia( this.noticia );
        }
      };
    } else {
      btnNoFav = {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorito');
          this.serviceDataLocal.guardarNoticia( this.noticia );
        }
      };
    }
    const actionSheet = await this.actionSheetCrtl.create({
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
           );
        }
      }, btnNoFav, {
        text: 'Cancelar',
        icon: 'close',
        cssClass: 'action-dark',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
