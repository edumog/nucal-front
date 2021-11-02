import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CreateUserDTO } from '@core/interfaces/dtos/create-user-dto';

import { AccountFacadeService } from '@base/app/security/services/account-facade.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  public registerForm = this.formBuilder.group({
    userName: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    passwordConfirmation: ['', [Validators.required]],
    keepLoggedIn: [false]
  });

  constructor(private formBuilder: FormBuilder, private storeFacade: AccountFacadeService) { }

  ngOnInit(): void {
  }

  public createUser() {
    if (this.registerForm.valid) 
      this.storeFacade.createUser(this.registerForm.value);
  }
}
