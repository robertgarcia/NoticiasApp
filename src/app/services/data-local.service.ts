import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor( private storage: Storage ) {
    this.storage.create();
  }

  guardarNoticia( noticia: Article ){
    const existe = this.noticias.find( exis => exis.title === noticia.title );
    if ( !existe ) {
      this.noticias.unshift(noticia);
      this.storage.set( 'favoritos', this.noticias);
    }
  }

  async cargarFavoritos(){
    const favoritos = await this.storage.get( 'favoritos' );

    if ( favoritos ){
      this.noticias = favoritos;
    }
  }

  guardarTema( dark: boolean ){
    this.storage.set('darkTheme', dark);
  }

  async isDarkTheme() {
    const isDarkTheme = await this.storage.get( 'darkTheme' );
    return isDarkTheme;
  }
}
