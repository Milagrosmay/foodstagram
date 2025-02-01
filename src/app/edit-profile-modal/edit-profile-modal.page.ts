import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController, ModalController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms'; //importamos el formbuilder
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.page.html',
  styleUrls: ['./edit-profile-modal.page.scss'],
  standalone:false
})
export class EditProfileModalPage implements OnInit {
  editProfileForm: FormGroup;
  errorMesagge:any;
  user_data: any = {
    name: '',
    last_name:'',
    email: '',
    image: '',
    username:'',
    followed_users: [],
    following_users: []
  };
  formErrors = {
    image: [
      { type: 'required', message: 'la imagen es obligatoria' }
    ],
    name: [
      { type: 'required', message: 'La descripción es obligatoria' },
    ],
    last_name: [
      { type: 'required', message: 'El apellido es obligatorio' }
    ],
    
  };


  constructor(
    private formBuilder: FormBuilder,
    private userService:UserService,
    private storage: Storage,
    private modalController: ModalController, 
    private authService: AuthService,
  ) {
    this.editProfileForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      last_name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      image: new FormControl('', Validators.compose([
        Validators.required
      ]))
    })
    
  }

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
  updateUser(registerData:any){
    this.user_data.name=registerData.name;
    this.user_data.last_name=registerData.last_name;
    this.update();
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
    this.editProfileForm.patchValue({ image: capturedPhoto.dataUrl });
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
  cedit(){
    this.modalController.dismiss();
    location.reload();
  }

}
