import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButton, IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle, IonText, IonLabel, IonItem, IonIcon, IonFooter, IonCheckbox } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';
import { addIcons,  } from 'ionicons';
import { cashOutline, calendarOutline, starOutline, hourglassOutline } from 'ionicons/icons';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonCheckbox, IonFooter, IonIcon, IonItem, IonLabel, IonText, IonCardTitle, IonCardContent, IonCardSubtitle, IonCardHeader, IonCard, IonButtons, IonButton, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCheckbox]
})
export class MovieDetailsPage implements OnInit {
  movie: any;
  imageBaseUrl = environment.images

  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService)

  constructor() { 
    addIcons({cashOutline, calendarOutline, starOutline, hourglassOutline})
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieDetails(id).subscribe((res) => {
      console.log(res)
      this.movie = res;
    });
  }

  openHomepage() {
    if (this.movie && this.movie.imdb_id) {
      const imdbUrl = `https://www.imdb.com/title/${this.movie.imdb_id}`;
      window.open(imdbUrl, '_blank');
    }
  }
}
