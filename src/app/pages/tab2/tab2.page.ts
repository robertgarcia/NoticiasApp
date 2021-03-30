import { Component, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { IonInfiniteScroll, IonSegment } from '@ionic/angular';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, AfterViewInit {

  @ViewChild( IonSegment ) segment: IonSegment;
  @ViewChild( IonInfiniteScroll ) infiniteScroll: IonInfiniteScroll;
  // @ViewChild('mySegment', { read: ElementRef }) private segment: ElementRef;
  categorias = [];
  noticias: Article[] = [];
  constructor( private noticiasService: NoticiasService ) {
    this.categorias = [ 'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology' ];
  }
  ngAfterViewInit(): void {
    this.segment.value = this.categorias[0];
  }

  ngOnInit(): void {
    this.cargarNoticias( this.categorias[0] );
  }

  segmentChanged( event ) {
    console.log(event);
    this.noticias = [];
    this.cargarNoticias( event.detail.value );
  }

  cargarNoticias( categoria: string, event? ) {
    this.noticiasService.getTopHeadlinesCategories( categoria ).subscribe( res => {
      this.noticias.push( ...res.articles );
      if ( event ) {
        event.target.complete();
        return;
      }
    });
  }

  loadData( event ) {
    this.cargarNoticias( this.segment.value, event );
  }
}
