import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButton, IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle, IonText, IonLabel, IonItem, IonIcon, IonFooter, IonList, IonListHeader, IonInput, IonAvatar } from '@ionic/angular/standalone';
import { ModalController} from '@ionic/angular/standalone';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-movie-modal',
  templateUrl: './add-movie-modal.component.html',
  styleUrls: ['./add-movie-modal.component.scss'],
  standalone: true,
  imports: [IonAvatar, IonListHeader, IonList, IonFooter, IonIcon, IonItem, IonLabel, IonText, IonCardTitle, IonCardContent, IonCardSubtitle, IonCardHeader, IonCard, IonButtons, IonButton, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput]
})
export class AddMovieModalComponent {
  movieName: string = '';
  imageBaseUrl = environment.images
  searchResults: any[] = [];

  constructor(private movieService: MovieService, private modalController: ModalController) {}

  searchMovies() {
    if (this.movieName.trim() !== '') {
      this.movieService.searchMoviesByName(this.movieName).subscribe(data => {
        this.searchResults = data.results;
      });
    }
  }

  addMovie(movie: any) {
    this.modalController.dismiss(movie);
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
