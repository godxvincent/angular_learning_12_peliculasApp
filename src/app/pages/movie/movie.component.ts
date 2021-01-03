import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { MovieDetail } from '../../interfaces/movie-detail-response';
import { Location } from '@angular/common';
import { CastElement } from '../../interfaces/credits-response';

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
    this.activatedRoute.params.subscribe( params => {
      this.moviesService.getMovie( params.id ).subscribe( movieDetail => {
        if ( movieDetail === null ) {
          this.router.navigate(['home']);
          return;
        }
        this.movieDetail = movieDetail;
      });
      this.moviesService.getCasting( params.id ).subscribe( casting => {
        this.movieCast = casting.filter( cast => cast.profile_path !== null && cast.known_for_department === 'Acting');
      });
    });

   }

  ngOnInit(): void {
  }

  onClickRegresar(): void {
    this.location.back();
  }

}
