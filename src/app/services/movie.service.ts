import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private http = inject(HttpClient);

  constructor() { }

  getTopRatedMovies(page = 1): Observable<any> {
    console.log(`Making API Call to: ${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`);  // Log the URL being hit
    return this.http.get(
      `${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`
    ).pipe(
      catchError((error) => {
        console.error('Error fetching movies:', error);
        return throwError(() => new Error('Error fetching movies'));
      })
    );
  }

  getMovieDetails(id: string) {
    return this.http.get(
      `${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`
    );
  }
}
