import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import {defineCustomElements} from '@ionic/pwa-elements/loader';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { EditProfileModalPage } from '../edit-profile-modal/edit-profile-modal.page';
defineCustomElements(window);

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false
})
export class AccountPage implements OnInit {
  user_data: any = {
    name: '',
    email: '',
    image: '',
    username:'',
    followed_users: [],
    following_users: []
  };
  constructor(
    private userService: UserService,
    private storage: Storage,
    private navCtrl: NavController,
    private modalController: ModalController

  ) { }

  async ngOnInit() {
    let user: any = await this.storage.get('user');
    console.log(user, "user");
    this.userService.getUser(user.id).then(
      (data: any) => {
        console.log(data);
        this.storage.set('user', data);
        this.user_data = data;
      }
    ).catch(
      (error) => { 
        console.log(error);
      });

  }
  async takePhoto() {
    console.log("take photo");
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100
    });
    console.log(capturedPhoto.dataUrl);
    this.user_data.image = capturedPhoto.dataUrl;
    this.update();
  }
  


  async update() {
    this.userService.updateUser(this.user_data).then(
      (data: any) => {
        console.log(data);
      }
    ).catch(
      (error) => {
        console.log(error);
      });
  }
  async editar() {
      console.log('Edit profile');
      const modal = await this.modalController.create({
        component: EditProfileModalPage,
        componentProps: {}
      });
      return await modal.present();
    }
 
  
  



}
