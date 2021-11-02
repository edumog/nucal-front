import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AccountFacadeService } from '@base/app/security/services/account-facade.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    keepLoggedIn: [false] 
  });

  constructor(private formBuilder: FormBuilder, private storeFacade: AccountFacadeService) { }

  ngOnInit(): void {
  }

  public login() {
    if(this.loginForm.valid) 
      this.storeFacade.login(this.loginForm.value);
  }
}
