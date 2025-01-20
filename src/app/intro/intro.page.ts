import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage-angular'; //importamos el storage
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: false,
})
export class IntroPage implements OnInit {

  constructor(
    private router: Router, 
    private storage: Storage //inyectamos el storage
  ) { }

  ngOnInit() {
  }

  finish(){
    console.log('Finish');
    this.storage.set('viLaIntro', true); //guardamos en el storage que ya se ha visto la intro

    this.router.navigateByUrl('/home');
  }

}
