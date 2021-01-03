import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CastElement, Credits } from '../interfaces/credits-response';
import { MovieDetail } from '../interfaces/movie-detail-response';
import { BillboardResponse, Movie } from '../interfaces/billboard-response';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private baseUrl = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando = false;

  constructor( private http: HttpClient ) { }

  // tslint:disable-next-line: typedef
  get params() {
    return {
      api_key: '',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }

  resetMoviePage(): void {
    this.carteleraPage = 1;
  }

  getBillboard(): Observable<Movie[]> {

    if ( this.cargando ) {
      // cargando peliculas
      return of([]);
    }
    this.cargando = true;
    return this.http.get<BillboardResponse>(`${ this.baseUrl }/movie/now_playing`,
    {
      params: this.params
    }).pipe(
      map( (resp) => resp.results ),
      tap( () => {
        this.carteleraPage += 1;
        this.cargando = false;
      })
    );


  }


  searchMovie( texto: string ): Observable<Movie[]> {

    const params = {...this.params, page: '1', query: texto };

    // https://api.themoviedb.org/3/search/movie
    return this.http.get<BillboardResponse>(`${ this.baseUrl }/search/movie`, {
      params
    }).pipe(
      map( resp => resp.results )
    );

  }


  getMovie( id: string ): Observable<MovieDetail> {

    return this.http.get<MovieDetail>(`${ this.baseUrl }/movie/${ id }`, {
      params: this.params
    }).pipe(
      catchError( err => of(null) )
    )

  }

  getCasting( id: string ): Observable<CastElement[]> {

    return this.http.get<Credits>(`${ this.baseUrl }/movie/${ id }/credits`, {
      params: this.params
    }).pipe(
      map( resp => resp.cast ),
      catchError( err => of([]) ),
    );

  }
}
