import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/billboard-response';
import { StarRatingComponent } from 'ng-starrating';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-poster-grid',
  templateUrl: './movies-poster-grid.component.html',
  styleUrls: ['./movies-poster-grid.component.css']
})
export class MoviesPosterGridComponent implements OnInit {

@Input() moviesGrid: Movie[];

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  onMovieClick( movie: Movie ): void {
    console.log(movie);
    this.router.navigate(['movie', movie.id]);

  }
}
