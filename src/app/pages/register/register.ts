import { CommonModule } from "@angular/common";
import { Component } from '@angular/core';
import { KeyEvent } from "@shared/directives/key-event/key-event";
import { ButtonModule } from "primeng/button";
import { StepperModule } from 'primeng/stepper';
import { UserInformation } from "./user-information/user-information";
import { Goals } from "./goals/goals";
import { Welcome } from "./welcome/welcome";

@Component({
  selector: 'app-register',
  imports: [
    ButtonModule,
    KeyEvent,
    StepperModule,
    CommonModule,
    UserInformation,
    Goals,
    Welcome
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  activeStep = 1;

}
