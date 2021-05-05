import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];
  darkTheme = false;

  constructor( private noticiasService: NoticiasService,
               private dataLocal: DataLocalService ) {
  }

  ngOnInit(): void {
    this.cargarNoticias();
    // Query for the toggle that is used to change between themes
    const toggle: any = document.querySelector('#themeToggle');

    // Listen for the toggle check/uncheck to toggle the dark class on the <body>
    toggle.addEventListener('ionChange', (ev: any) => {
      document.body.classList.toggle('dark', ev.detail.checked);

      console.log(ev.detail.checked);
    });

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addListener((e) => checkToggle(e.matches));

    // Called when the app loads
    function loadApp() {
      checkToggle(prefersDark.matches);
    }

    // Called by the media query to check/uncheck the toggle
    function checkToggle(shouldCheck) {
      toggle.checked = shouldCheck;
    }
    loadApp();
  }

  loadData( event ) {
    this.cargarNoticias(event);
  }

  cargarNoticias( event? ) {
    this.noticiasService.getTopHeadlines().subscribe( resp => {
      if ( resp.articles.length === 0 ) {
        event.target.disabled = true;
        event.target.complete();
        return;
      }

      this.noticias.push( ...resp.articles );

      if ( event ) {
        event.target.complete();
      }
    });
  }

}
