import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  errorMessage: any;
  formErrors={
    email:[
      {type:'required',message:'El correo es obligatorio'},
      {type:'email',message:'El correo no es válido'}
    ],

    password:[
      {type:'required',message:'la contraseña es obligatoria'},
      {type:'minlength',message:'la contraseña debe tener al menos 6 caracteres'}
    ]

  }
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private storage: Storage
  ) {
    this.loginForm=this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
        
      ]))
    })
  }

  ngOnInit() {
  }

  loginUser(credentials:any){
    this.authService.login(credentials).then((res:any)=>{
      console.log(res);
      console.log('Usuario logueado');
      this.errorMessage='';
      this.storage.set('user', res.user);
      this.storage.set('isUserLoggedIn', true);
      this.navCtrl.navigateForward('/menu/home');

    }).catch(err=>{
      console.log(err);
      this.errorMessage=err;
    });
    
  }

}
