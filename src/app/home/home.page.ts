import { Component } from '@angular/core';
import {register} from 'swiper/element/bundle'; //importamos el registro del swiper 
import {PostService} from '../services/post.service'; //importamos el servicio de post
import { ModalController } from '@ionic/angular';
import {AddPostModalPage} from '../add-post-modal/add-post-modal.page'; //importamos el modal de agregar post

register(); //registramos el swiper
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  posts:any;
  constructor(
    private postService: PostService,
    private modalController: ModalController
  ) {}

  ngOnInit(){
    console.log('Home Page');
    this.postService.getPosts().then((data:any)=>{
      console.log(data);
      this.posts=data;
    })
  }

  async addPost(){
    console.log('Add Post');
    const modal= await this.modalController.create({
      component: AddPostModalPage,
      componentProps:{}
    });
    return await modal.present();
  }

}
