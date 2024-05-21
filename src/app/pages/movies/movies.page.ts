import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonImg, IonBadge, IonAvatar, IonButton, IonListHeader, IonThumbnail, IonInput, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle, IonCheckbox, IonReorder, IonReorderGroup, IonItemSliding, IonItemOptions, IonItemOption, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { MovieService } from 'src/app/services/movie.service';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router, RouterLink } from '@angular/router';
import { AddMovieModalComponent } from 'src/app/modals/add-movie-modal/add-movie-modal.component';
import { TrendingMoviesModalComponent } from 'src/app/modals/TrendingMoviesModal/trending-movies-modal/trending-movies-modal.component';
import { ModalController} from '@ionic/angular/standalone';
import { ItemReorderEventDetail } from '@ionic/angular';
import { PopularMoviesModalComponent } from 'src/app/modals/popular-movies-modal/popular-movies-modal.component';
import { UpcomingMoviesModalComponent } from 'src/app/modals/upcoming-movies-modal/upcoming-movies-modal.component';
import { Storage } from '@ionic/storage-angular';
//import { LoadingController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonItemOption, IonItemOptions, IonItemSliding, IonReorderGroup, IonReorder, IonCheckbox, IonCardTitle, IonCardContent, IonCardSubtitle, IonCardHeader, IonCard, IonListHeader, IonButton, IonAvatar, IonBadge, IonImg, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HttpClientModule, NgFor, NgIf, RouterLink, IonThumbnail, IonInput]
})
export class MoviesPage implements OnInit {

  movies: any[] = [];
  currentPage = 1;
  imageBaseUrl = environment.images
  movieName: string = '';
  searchResults: any[] = [];

//private loadingCtrl = inject(LoadingController);
private router = inject(Router);
private movieService = inject(MovieService);
private modalController = inject(ModalController)
private storage = inject(Storage);

  constructor() { }

  ngOnInit(): void {
    console.log("ngOnInit")
    this.logImageUrls();

    this.storage.get("movies").then(val=>{
      if (val == null) {
        this.movies = []} else {
        this.movies = val;
        }
     })

    //this.loadMovies

   /* this.movieService.getTopRatedMovies(this.currentPage).subscribe({
      next: (res) => {
        this.movies = [...this.movies, ...res.results];
        console.log('API Response: ', res);
        // loading.dismiss();
      },
      error: (error) => {
        console.error('Error loading movies:', error);
        // loading.dismiss();
      }
    });
    */
  }

  async openAddMovieModal(movieToEdit: any = null, index: number = -1) {
    await this.storage.set("movies", this.movies);
    const modal = await this.modalController.create({
      component: AddMovieModalComponent,
      componentProps: { movieToEdit }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data) {
        const movie = dataReturned.data;
        movie.completed = false; // Add completed property
        if (index > -1) {
          this.movies[index] = movie; // Edit existing movie
        } else {
          this.movies.push(movie); // Add new movie
        }
      }
    });

    return await modal.present();
  }

  async openTrendingMoviesModal() {
    const modal = await this.modalController.create({
      component: TrendingMoviesModalComponent
    });
    return await modal.present();
  }
  
  async openPopularMoviesModal() {
    const modal = await this.modalController.create({
      component: PopularMoviesModalComponent
    });
    return await modal.present();
  }

 async openUpcomingMoviesModal(){
    const modal = await this.modalController.create({
      component: UpcomingMoviesModalComponent
    });
    return await modal.present();
  }

  deleteMovie(index: number) {
    this.movies.splice(index, 1);
  }

  goToMovieDetails(id: string) {
    this.router.navigate(['/movie-details', id]);
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  } 

  // Add this method to log image URLs
  logImageUrls() {
    this.movies.forEach(movie => {
      console.log(`${this.imageBaseUrl}/w92${movie.poster_path}`);
    });
  }

 
   

/* async loadMovies() {

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
*/
}
