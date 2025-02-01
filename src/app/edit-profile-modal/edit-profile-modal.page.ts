import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController, ModalController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms'; //importamos el formbuilder
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { AuthService } from '../services/auth.service';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

defineCustomElements(window)

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
    private alertController: AlertController
  ) {
    this.editProfileForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      last_name: new FormControl('', Validators.compose([
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
  async takePhoto(source:CameraSource) {
    console.log("take photo");
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: source,
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
  cedit(){
    this.modalController.dismiss();
    location.reload();
  }
  async presentphotoOptions() {
    const alert = await this.alertController.create({
    header: 'Selecciona una opción',
    message: '¿De dónde quieres obtener la imagen?',
    buttons:[
      {
        text: "camara",
        handler: () => {
          this.takePhoto(CameraSource.Camera);
        }
      },
      {
        text: "Galeria",
        handler: () => {
          this.takePhoto(CameraSource.Photos);
        }
      },
      {
        text: "Cancelar",
        role: "cancel",
        handler: () => {
          console.log("cancelar");
        }
      }
    ]
    });
    await alert.present();
    }

}
