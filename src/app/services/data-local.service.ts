import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor( private storage: Storage, public toastController: ToastController ) {
    this.storage.create();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      animated: true,
      position: 'middle',
      color: 'success'
    });
    toast.present();
  }


  guardarNoticia( noticia: Article ){
    const existe = this.noticias.find( exis => exis.title === noticia.title );
    if ( !existe ) {
      this.noticias.unshift(noticia);
      this.storage.set( 'favoritos', this.noticias);
    }
    this.presentToast('Agregado a Favorito');
  }

  async cargarFavoritos(){
    const favoritos = await this.storage.get( 'favoritos' );

    if ( favoritos ){
      this.noticias = favoritos;
    }
  }

  borrarNoticia( noticia: Article ) {
    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title );
    this.storage.set( 'favoritos', this.noticias);
    this.presentToast('Borrado de Favoritos');
  }

  guardarTema( dark: boolean ){
    this.storage.set('darkTheme', dark);
  }

  async isDarkTheme() {
    const isDarkTheme = await this.storage.get( 'darkTheme' );
    return isDarkTheme;
  }
}
