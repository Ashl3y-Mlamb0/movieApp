import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { MovieService } from './services/movie.service';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, HttpClientModule],
  providers: [MovieService],
})
export class AppComponent implements OnInit{
  constructor(private storage: Storage) {

  }

  async ngOnInit(){
    await this.storage.create();
 
  }
}
