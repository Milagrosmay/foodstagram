import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera'; //importamos la camara de capacitor
import { defineCustomElements } from '@ionic/pwa-elements/loader'; //importamos los elementos de ionic
import { FormBuilder, FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms'; //importamos el formbuilder
import { PostService } from '../services/post.service';
import { Storage } from '@ionic/storage-angular';
import { ModalController } from '@ionic/angular';
defineCustomElements(window);
@Component({
  selector: 'app-add-post-modal',
  templateUrl: './add-post-modal.page.html',
  styleUrls: ['./add-post-modal.page.scss'],
  standalone: false,
})
export class AddPostModalPage implements OnInit {
  post_image: any;
  addPostForm: FormGroup;
  errorMessage: any;
  formErrors = {
    image: [
      { type: 'required', message: 'la imagen es obligatoria' }
    ],
    description: [
      { type: 'required', message: 'La descripción es obligatoria' },
      {type: 'minlength', message: 'debe tener minimo 10 caracteres'},
      {type: 'maxlength', message: 'debe tener máximo 500 caracteres'}

    ]
    
  };


  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private storage: Storage,
    private modalController: ModalController
  ) {
    this.addPostForm = this.formBuilder.group({
      description: new FormControl('', Validators.compose([ Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500)
      ])),
      image: new FormControl('', Validators.required)
    });

  }

  ngOnInit() {
  }
  async uploadPhone() {
    console.log('Upload Photo');
    const uploadPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
      quality: 100
    });
    this.post_image = uploadPhoto.dataUrl;
    this.addPostForm.patchValue({
      image: this.post_image
    });
  }

  async addPost(post_data: any) {
    console.log('Add Post');
    console.log(post_data);
    const user = await this.storage.get('user');
    const post_param = {
      post: {
        description: post_data.description,
        image: post_data.image,
        user_id: user.id
      }

    }
    console.log(post_param, 'post para enviar  ');
    this.postService.createPost(post_param).then(
      (data: any) => {
        console.log(data, 'post creado');
        this.modalController.dismiss({ null: null });
      },
      (error: any) => {
        console.log(error, 'error');
      }
    );
  }
}

