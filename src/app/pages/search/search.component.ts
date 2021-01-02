import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/billboard-response';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchedMovie = '';
  movies: Movie[] = [];
  constructor(private activatedRoute: ActivatedRoute, private moviesService: MoviesService) {
    this.activatedRoute.params.subscribe( params => {
      this.searchedMovie = params.text;
      this.moviesService.searchMovie(this.searchedMovie).subscribe( movies => {
        this.movies = movies;
      });
    });
   }

  ngOnInit(): void {
  }

}
