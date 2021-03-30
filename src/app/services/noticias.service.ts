import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key' : apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headLinesPage = 0;
  categoriaActial = '';
  categoriaPage = 0;
  constructor( private http: HttpClient ) { }

  exeRequest<T>( req: string ){
    req = `${ apiUrl }${ req }`;
    return this.http.get<T>( req, { headers } );
  }

  getTopHeadlines(){
    this.headLinesPage++;
    return this.exeRequest<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headLinesPage}`);
  }

  getTopHeadlinesCategories( categoria: string ){
    if ( this.categoriaActial === categoria ) {
      this.categoriaPage++;
    } else {
      this.categoriaActial = categoria;
      this.categoriaPage = 1;
    }

    return this.exeRequest<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${ categoria }&page=${ this.categoriaPage }`);
  }
}
