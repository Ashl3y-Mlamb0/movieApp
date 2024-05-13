import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { MovieService } from 'src/app/services/movie.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HttpClientModule, NgFor, NgIf]
})
export class MoviesPage implements OnInit {

  movies: any[] = [];
  currentPage = 1;

private loadingCtrl = inject(LoadingController);
private movieService = inject(MovieService);

  constructor() { }

  ngOnInit() {
    this.loadMovies
    
  }

 async loadMovies() {

    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    this.movieService.getTopRatedMovies(this.currentPage).subscribe({
      next: (res) => {
        this.movies = [...this.movies, ...res.results];
        console.log('API Response:', res);
        loading.dismiss();
      },
      error: (error) => {
        console.error('Error loading movies:', error);
        loading.dismiss();
      }
    });
  }

}
