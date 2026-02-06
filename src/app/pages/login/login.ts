import { Component, inject, signal } from '@angular/core';
import { iLoginForm } from "./login.model";
import { form, required, FormField, minLength } from '@angular/forms/signals';
import { CommonModule } from "@angular/common";
import { KeyEvent } from "@shared/directives/key-event/key-event";
import { ToastService } from "@shared/components/toast/toast-service";
import { Router } from "@angular/router";
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideUser, lucideLock, lucideMoveRight, lucideCirclePlus } from '@ng-icons/lucide'
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';

@Component({
  selector: 'app-login',
  providers: [provideIcons({lucideUser, lucideLock, lucideMoveRight, lucideCirclePlus})],
  imports: [
    FormField,
    CommonModule,
    KeyEvent,
    HlmInputGroupImports,
    NgIcon,
    HlmButtonImports,
    HlmIconImports,
    HlmLabelImports,
    HlmSeparatorImports
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  toastService = inject(ToastService)
  router = inject(Router)

  login = signal<iLoginForm>({
    username: '',
    password: ''
  })

  loginForm = form(this.login, (field) => {
    required(field.username, { message: 'Username is required' });
    required(field.password, { message: 'Password is required' });
    minLength(field.username, 4, { message: 'Username must be at least 4 characters long' });
    minLength(field.password, 6, { message: 'Password must be at least 6 characters long' });
  })

  submitLogin(): void {
    if (this.loginForm().invalid()) {
      this.toastService.danger("Informe o usuário e senha para prosseguir")
      return
    }
    const { username, password } = this.loginForm().value()
  }

  navigateToRegister(): void {
    this.router.navigate(['register'])
  }

  navigateToResetPassword(): void {
    this.router.navigate(['login'])
  }

}
