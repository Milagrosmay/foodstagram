import { Component } from '@angular/core';
import {register} from 'swiper/element/bundle'; //importamos el registro del swiper 
import { Storage } from '@ionic/storage-angular';
register(); //registramos el swiper
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private storage: Storage) {}
  async ngOnInit() {
    await this.storage.create();
  }
}
