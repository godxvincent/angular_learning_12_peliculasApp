import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { MovieDetail } from '../../interfaces/movie-detail-response';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movieDetail: MovieDetail;

  constructor(private activatedRoute: ActivatedRoute,
              private moviesService: MoviesService,
              private location: Location) {
    this.activatedRoute.params.subscribe( params => {
      this.moviesService.getMovie( params.id ).subscribe( movieDetail => {
        this.movieDetail = movieDetail;
        console.log(this.movieDetail);
      });
    });
   }

  ngOnInit(): void {
  }

  onClickRegresar(): void {
    this.location.back();
  }

}
