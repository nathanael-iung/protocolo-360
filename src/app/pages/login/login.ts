import { Component, inject, OnInit, signal, TemplateRef, viewChild, ViewChild } from '@angular/core';
import { iLoginForm } from "./login.model";
import { form, required, FormField, minLength, email } from '@angular/forms/signals';
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
import { take } from "rxjs";
import { AuthService } from "@core/services/auth/auth-service";
import { TokenMetadataService } from "@core/services/token-metadata/token-metadata-service";
import { iTokenMetadata } from "@shared/models/token.model";

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
  authService = inject(AuthService)
  tokenMetadataService = inject(TokenMetadataService)

  login = signal<iLoginForm>({
    email: '',
    password: ''
  })

  loginForm = form(this.login, (field) => {
    required(field.email, { message: 'Email is required' });
    required(field.password, { message: 'Password is required' });
    minLength(field.email, 4, { message: 'Email must be at least 4 characters long' });
    minLength(field.password, 6, { message: 'Password must be at least 6 characters long' });
    email(field.email, { message: 'Email must have a valid format' });
  })

  isEmailInvalid = signal(false)
  isPasswordInvalid = signal(false)

  submitLogin(): void {

    this.loginForm().markAsTouched()

    //Workaround to show errors only after submit, since Spartan NG input groups(cases of email and password fields) doesn´t support touched state yet
    this.isEmailInvalid.set(this.loginForm.email().invalid())
    this.isPasswordInvalid.set(this.loginForm.password().invalid())

    if (this.loginForm().invalid()) {
      this.toastService.danger("Preencha os campos corretamente para prosseguir")
      return
    }

    const { email, password } = this.loginForm().value()

    this.authService.login(email, password)
    .pipe(
      take(1)
    )
    .subscribe({
      next: (response) => {
        const tokenMetadata = {
          ...response.data,
          isAuthenticated: true
        }
        this.tokenMetadataService.setTokenMetadata(tokenMetadata)
        this.authService.setSessionHint()
        this.toastService.success("Login realizado com sucesso!")
        this.router.navigate(['dashboard'])
      }
    })

  }

  navigateToRegister(): void {
    this.router.navigate(['register'])
  }

  navigateToResetPassword(): void {
    this.router.navigate(['login'])
  }

}
