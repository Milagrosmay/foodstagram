import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { last } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  errorMessage: any;
  formErrors = {
    email: [
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'email', message: 'El correo no es válido' }
    ],
    name: [
      { type: 'required', message: 'El nombre es obligatorio' }
    ],
    lastname: [
      { type: 'required', message: 'El apellido es obligatorio' }
    ],
    username: [
      { type: 'required', message: 'El nombre de usuario es obligatorio' }
    ],
    password:[
      {type:'required',message:'la contraseña es obligatoria'},
      {type:'minlength',message:'la contraseña debe tener al menos 6 caracteres'}
    ],
    passwordConfirmation:[
      {type:'required',message:'debes confirmar la contraseña'},
      {type:'minlength',message:'la contraseña debe tener al menos 6 caracteres'},
    ]
   
  };

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      email:new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.required
      ])),
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      passwordConfirmation: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    })

  }

  ngOnInit() {
  }

}
