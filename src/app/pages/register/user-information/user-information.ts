import { Component, signal } from '@angular/core';
import { FormField, form, minLength, required, email } from "@angular/forms/signals";
import { iUserInformationForm } from "./user-information.model";
import { FormsModule } from "@angular/forms";
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from "@spartan-ng/helm/label";
import { HlmDatePickerImports } from '@spartan-ng/helm/date-picker';
import dayjs from 'dayjs'
import { Gender } from "@shared/enum/gender";
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';

@Component({
  selector: 'app-user-information',
  imports: [
    FormField,
    FormsModule,
    HlmInputImports,
    HlmLabelImports,
    HlmDatePickerImports,
    HlmSelectImports,
    BrnSelectImports
  ],
  templateUrl: './user-information.html',
  styleUrl: './user-information.css',
})
export class UserInformation {

  userInformation = signal<iUserInformationForm>({
    fullName: '',
    birthDate: '',
    phoneNumber: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  userInformationForm = form(this.userInformation, (field) => {
    required(field.fullName, { message: 'Username is required' });
    required(field.birthDate, { message: 'Birth date is required' });
    required(field.phoneNumber, { message: 'Phone number is required' });
    required(field.email, { message: 'E-mail is required' });
    required(field.password, { message: 'Password is required' });
    minLength(field.password, 6, { message: 'Password must be at least 6 characters long' });
    email(field.email, { message: 'E-mail must have a valid format' });
  })

  minDate = signal(new Date(1900, 0, 1));
  maxDate = signal(new Date());

  formatDate = (date: Date) => dayjs(date).format('DD/MM/YYYY');

  dateChange(date: Date): void {
    this.userInformation.update((current) => ({
      ...current,
      birthDate: dayjs(date).format('YYYY-MM-DD')
    }));
  }

  genders = signal([
    { value: 'M', label: Gender.M },
    { value: 'F', label: Gender.F },
    { value: 'O', label: Gender.O }
  ])

  genderChange(value: Event): void {
    this.userInformation.update((current) => ({
      ...current,
      gender: value
    }));
  }
}
