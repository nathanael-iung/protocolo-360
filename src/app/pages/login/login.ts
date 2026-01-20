import { Component, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from "@angular/router";
import { iLoginForm } from "./login.model";
import { form, required, FormField } from '@angular/forms/signals';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-login',
  imports: [
    InputTextModule,
    PasswordModule,
    ButtonModule,
    RouterLink,
    FormField,
    DividerModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  login = signal<iLoginForm>({
    username: '',
    password: ''
  })

  loginForm = form(this.login, (field) => {
    required(field.username, { message: 'Username is required' });
    required(field.password, { message: 'Password is required' });
  })

  submitLogin(): void {

  }

  navigateToCadastro(): void {

  }

}
