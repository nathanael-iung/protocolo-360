import { Component, signal } from '@angular/core';
import { FormField, form, minLength, required, email } from "@angular/forms/signals";
import { iUserInformationForm } from "./user-information.model";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-user-information',
  imports: [
    FormField,
    InputTextModule,
    PasswordModule,
    FormsModule
  ],
  templateUrl: './user-information.html',
  styleUrl: './user-information.css',
})
export class UserInformation {

  userInformation = signal<iUserInformationForm>({
    fullName: '',
    birthDate: null,
    phoneNumber: '',
    gender: null,
    email: '',
    password: '',
    confirmPassword: ''
  })

  userInformationForm = form(this.userInformation, (field) => {
    required(field.fullName, { message: 'Username is required' });
    required(field.birthDate, { message: 'Birth date is required' });
    required(field.email, { message: 'E-mail is required' });
    required(field.password, { message: 'Password is required' });
    minLength(field.password, 6, { message: 'Password must be at least 6 characters long' });
    email(field.email, { message: 'E-mail must have a valid format' });
  })

}
