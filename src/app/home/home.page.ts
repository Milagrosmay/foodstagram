import { Component } from '@angular/core';
import {register} from 'swiper/element/bundle'; //importamos el registro del swiper 

register(); //registramos el swiper
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor() {}

}
