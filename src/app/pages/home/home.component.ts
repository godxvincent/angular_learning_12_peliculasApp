import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/billboard-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[] = [];
  public moviesSlideShow: Movie[] = [];


  constructor(private moviesService: MoviesService) { }
  ngOnDestroy(): void {
    this.moviesService.resetMoviePage();
  }

  ngOnInit(): void {
    this.moviesService.getBillboard().subscribe( movies => {
      this.movies = movies;
      this.moviesSlideShow = movies;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {

    // La idea de manejar .body o .documentElement es porque hay navegadores que no soportan el .documentElement
    const posicion = (document.documentElement.scrollTop || document.body.scrollTop) + 1400;
    const maximaProfundidad = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if ( this.moviesService.cargando ) {
      return;
    }

    if ( posicion > maximaProfundidad ){
      this.moviesService.getBillboard().subscribe( movies => {
        this.movies.push(...movies);
      });
    }

  }



}
