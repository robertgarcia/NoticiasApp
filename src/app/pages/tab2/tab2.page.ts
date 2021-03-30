import { Component, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, AfterViewInit {

  @ViewChild( IonSegment ) segment: IonSegment;
  // @ViewChild('mySegment', { read: ElementRef }) private segment: ElementRef;
  categorias = [];
  constructor( private noticiasService: NoticiasService ) {
    this.categorias = [ 'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology' ];
  }
  ngAfterViewInit(): void {
    this.segment.value = this.categorias[0];
  }

  ngOnInit(): void {
    this.noticiasService.getTopHeadlinesCategories( this.categorias[0] ).subscribe( res => {
      console.log(res);
    });
  }

  segmentChanged( event ) {

    const valorSegmento = event.detail.value;
    console.log(valorSegmento);

  }

}
