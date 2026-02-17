import { Component, signal, inject, output, } from '@angular/core';
import { FormField, form, minLength, required, email, submit } from "@angular/forms/signals";
import { iUserInformationForm } from "./user-information.model";
import { FormsModule } from "@angular/forms";
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from "@spartan-ng/helm/label";
import { Gender } from "@shared/enum/gender";
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { KeyEvent } from "@shared/directives/key-event/key-event";
import { CommonModule } from "@angular/common";
import { ToastService } from "@shared/components/toast/toast-service";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { Router } from "@angular/router";
import { RegisterService } from "../register-service";
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

@Component({
  selector: 'app-user-information',
  imports: [
    FormField,
    FormsModule,
    HlmInputImports,
    HlmLabelImports,
    HlmSelectImports,
    BrnSelectImports,
    KeyEvent,
    CommonModule,
    HlmButtonImports,
    NgxMaskDirective
  ],
  templateUrl: './user-information.html',
  styleUrl: './user-information.css',
  providers: [provideNgxMask()]
})
export class UserInformation {

  constructor() {}

  userInformationFields = output<iUserInformationForm>();

  toastService = inject(ToastService);
  router = inject(Router)
  registerService = inject(RegisterService);

  userInformation = signal<iUserInformationForm>({
    fullName: '',
    birthDate: '',
    phone: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  userInformationForm = form(this.userInformation, (field) => {
    required(field.fullName, { message: 'Username is required' });
    required(field.birthDate, { message: 'Birth date is required' });
    required(field.phone, { message: 'Phone number is required' });
    required(field.gender, { message: 'Gender is required' });
    required(field.email, { message: 'E-mail is required' });
    email(field.email, { message: 'E-mail must have a valid format' });
    required(field.password, { message: 'Password is required' });
    minLength(field.password, 8, { message: 'Password must be at least 8 characters long' });
    required(field.confirmPassword, { message: 'Confirm password is required' });
    minLength(field.confirmPassword, 8, { message: 'Confirm password must be at least 8 characters long' });
  });

  isGenderInvalid = signal(false);

  genders = signal([
    { value: 'M', label: Gender.M },
    { value: 'F', label: Gender.F },
    { value: 'O', label: Gender.O }
  ]);

  genderChange(value: Event): void {
    this.userInformation.update((current) => ({
      ...current,
      gender: value
    }));
  }

  validateDate(): void {
    const isDateValid = dayjs(this.userInformation().birthDate, 'DD/MM/YYYY', true).isValid()
    if(!isDateValid) {
      this.userInformation.update((current) => ({
        ...current,
        birthDate: ''
      }));
      this.toastService.danger("Data de nascimento inválida. Use o formato DD/MM/AAAA.");
    }
  }

  nextStep(): void {

    this.isGenderInvalid.set(this.userInformationForm.gender().invalid())
    this.userInformationFields.emit(this.userInformationForm().value());

    if(this.userInformation().password !== this.userInformation().confirmPassword) {
      this.toastService.danger("As senhas não coincidem. Por favor, verifique e tente novamente.");
      return;
    }

    submit(this.userInformationForm, async () => {
      this.registerService.triggerNextStep();
    });

    if(this.userInformationForm().invalid()) {
      this.toastService.danger("Preencha os campos corretamente para prosseguir")
      return
    }
  }

  previousStep(): void {
    if(!this.userInformationForm().dirty()){
      this.registerService.triggerPreviousStep();
    } else {
      this.router.navigate(['login']);
    }
  }

}
