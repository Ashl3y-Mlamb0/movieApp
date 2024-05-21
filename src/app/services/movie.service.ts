import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Root {
  page: number
  results: Result[]
  total_pages: number
  total_results: number
}

export interface Result {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private http = inject(HttpClient);

  constructor() { }

  getTopRatedMovies(page:any): Observable<Root> {
    console.log(`Making API Call to: ${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`);  // Log the URL being hit
    return this.http.get<Root>(
      `${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`
    ).pipe(
      catchError((error) => {
        console.error('Error fetching movies:', error);
        return throwError(() => new Error('Error fetching movies'));
      })
    );
  }

  getMovieDetails(id: any) {
    return this.http.get(
      `${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`
    );
  }

  searchMoviesByName(name: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/search/movie?api_key=${environment.apiKey}&query=${name}`);
  }

  getTrendingMovies(page:any): Observable<Root> {
    console.log(`Making API Call to: ${environment.baseUrl}/trending/movie/week?api_key=${environment.apiKey}&page=${page}`);
    return this.http.get<Root>(
      `${environment.baseUrl}/trending/movie/week?api_key=${environment.apiKey}&page=${page}`
    ).pipe(
      catchError((error) => {
        console.error('Error fetching trending movies:', error);
        return throwError(() => new Error('Error fetching trending movies'));
      })
    );
  }

  getUpcomingMovies(page:any): Observable<Root> {
    console.log(`Making API Call to: ${environment.baseUrl}/movie/upcoming?api_key=${environment.apiKey}&page=${page}`);
    return this.http.get<Root>(
      `${environment.baseUrl}/movie/upcoming?api_key=${environment.apiKey}&page=${page}`
    ).pipe(
      catchError((error) => {
        console.error('Error fetching upcoming movies:', error);
        return throwError(() => new Error('Error fetching upcoming movies'));
      })
    );
  }
}
