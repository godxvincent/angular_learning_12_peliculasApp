import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { MovieDetail } from '../../interfaces/movie-detail-response';
import { Location } from '@angular/common';
import { CastElement } from '../../interfaces/credits-response';
import { combineAll } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movieDetail: MovieDetail;
  movieCast: CastElement[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private moviesService: MoviesService,
              private location: Location,
              private router: Router) {

    const movieId = this.activatedRoute.snapshot.params.id;

    // Combina y ejecuta todos los observables y espera a que todos los observables se ejecuten y tengan al menos una respuesta.
    combineLatest(
      [
        this.moviesService.getMovie( movieId ),
        this.moviesService.getCasting( movieId )
      ]
    ).subscribe( ([movieDetail, casting]) => {
      if ( movieDetail === null ) {
        this.router.navigate(['home']);
        return;
      }
      this.movieDetail = movieDetail;
      this.movieCast = casting.filter( cast => cast.profile_path !== null && cast.known_for_department === 'Acting');
    });

    // this.activatedRoute.params.subscribe( params => {
    //   this.moviesService.getMovie( params.id ).subscribe( movieDetail => {
    //     if ( movieDetail === null ) {
    //       this.router.navigate(['home']);
    //       return;
    //     }
    //     this.movieDetail = movieDetail;
    //   });
    //   this.moviesService.getCasting( params.id ).subscribe( casting => {
    //     this.movieCast = casting.filter( cast => cast.profile_path !== null && cast.known_for_department === 'Acting');
    //   });
    // });

   }

  ngOnInit(): void {
  }

  onClickRegresar(): void {
    this.location.back();
  }

}
