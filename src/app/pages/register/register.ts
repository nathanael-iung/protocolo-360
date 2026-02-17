import { CommonModule } from "@angular/common";
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { UserInformation } from "./user-information/user-information";
import { Goals } from "./goals/goals";
import { Welcome } from "./welcome/welcome";
import { HlmTabsImports } from '@spartan-ng/helm/tabs';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideStar, lucideTrophy, lucideUser } from "@ng-icons/lucide";
import { BrnTabsImports } from "@spartan-ng/brain/tabs";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { iUserInformationForm } from "./user-information/user-information.model";
import { RegisterService } from "./register-service";
import { Subject, take, takeUntil } from "rxjs";
import { Router } from "@angular/router";
import { ToastService } from "@shared/components/toast/toast-service";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat)

@Component({
  selector: 'app-register',
  providers: [provideIcons({lucideUser, lucideTrophy, lucideStar})],
  imports: [
    CommonModule,
    UserInformation,
    Goals,
    Welcome,
    HlmTabsImports,
    NgIcon,
    BrnTabsImports,
    HlmButtonImports
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit, OnDestroy {

  registerService = inject(RegisterService)
  router = inject(Router);
  toastService = inject(ToastService)

  tabs = ['user-information', 'goals', 'welcome'];
  activeTab = signal<'user-information' | 'goals' | 'welcome'>('user-information');

  userInformationFields = signal<iUserInformationForm>({} as iUserInformationForm);
  selectedGoals = signal<string[]>([]);

  sub$ = new Subject<void>();

  constructor() {}

  ngOnInit(): void {
    this.listenSubs();
  }

  ngOnDestroy(): void {
    this.sub$.next();
    this.sub$.complete();
  }

  listenSubs(): void {

    this.registerService.listenNextStep()
    .pipe(takeUntil(this.sub$))
    .subscribe(() => {
      const currentIndex = this.tabs.indexOf(this.activeTab());
      if (currentIndex < this.tabs.length - 1) {
        this.activeTab.set(this.tabs[currentIndex + 1] as 'user-information' | 'goals' | 'welcome');
      } else {
        this.createRegister()
      }
    });

    this.registerService.listenPreviousStep()
    .pipe(takeUntil(this.sub$))
    .subscribe(() => {
      const currentIndex = this.tabs.indexOf(this.activeTab());
      if (currentIndex > 0) {
        this.activeTab.set(this.tabs[currentIndex - 1] as 'user-information' | 'goals' | 'welcome');
      } else {
        this.router.navigate(['login']);
      }
    });
  }

  tabChanged(tab: string): void {
    this.activeTab.set(tab as 'user-information' | 'goals' | 'welcome');
  }

  setUserInformationFields(fields: iUserInformationForm): void {
    this.userInformationFields.set(fields);
    console.log('User Information Fields:', this.userInformationFields());
  }

  setSelectedGoals(goals: string[]): void {
    this.selectedGoals.set(goals);
    console.log('Selected Goals:', this.selectedGoals());
  }

  createRegister(): void {

    this.userInformationFields.update((current) => ({
      ...current,
      birthDate: dayjs(this.userInformationFields().birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
    }));

    this.registerService.registerUser(this.userInformationFields(), this.selectedGoals())
    .pipe(
      take(1)
    )
    .subscribe({
      next: () => {
        this.toastService.success("Cadastro realizado com sucesso.")
        this.router.navigate(['login'])
      }
    })
  }

}