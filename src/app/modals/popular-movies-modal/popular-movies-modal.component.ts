import { Component,inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButton, IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle, IonText, IonLabel, IonItem, IonIcon, IonFooter, IonList, IonListHeader, IonInput, IonAvatar, IonItemSliding, IonBadge, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { ModalController} from '@ionic/angular/standalone';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-popular-movies-modal',
  templateUrl: './popular-movies-modal.component.html',
  styleUrls: ['./popular-movies-modal.component.scss'],
  standalone: true,
  imports: [IonInfiniteScrollContent, IonInfiniteScroll, IonBadge, IonItemSliding, IonAvatar, IonListHeader, IonList, IonFooter, IonIcon, IonItem, IonLabel, IonText, IonCardTitle, IonCardContent, IonCardSubtitle, IonCardHeader, IonCard, IonButtons, IonButton, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput]
})
export class PopularMoviesModalComponent  implements OnInit {
  PopularMovies: any[] = [];
  currentPage = 1;
  imageBaseUrl = environment.images;

  constructor(private movieService: MovieService, private modalController: ModalController) {}

  ngOnInit() {
    this.movieService.getTopRatedMovies(this.currentPage).subscribe({
      next: (res) => {
        this.PopularMovies = [...this.PopularMovies, ...res.results];
        console.log('API Response: ', res);
        // loading.dismiss();
      },
      error: (error) => {
        console.error('Error loading movies:', error);
        // loading.dismiss();
      }
    });

  }
  

  closeModal() {
    this.modalController.dismiss();
  }

}
