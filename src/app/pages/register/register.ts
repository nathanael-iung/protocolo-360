import { CommonModule } from "@angular/common";
import { Component, signal } from '@angular/core';
import { KeyEvent } from "@shared/directives/key-event/key-event";
import { UserInformation } from "./user-information/user-information";
import { Goals } from "./goals/goals";
import { Welcome } from "./welcome/welcome";
import { HlmTabsImports } from '@spartan-ng/helm/tabs';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideStar, lucideTrophy, lucideUser } from "@ng-icons/lucide";
import { BrnTabsImports } from "@spartan-ng/brain/tabs";
import { HlmButtonImports } from "@spartan-ng/helm/button";

@Component({
  selector: 'app-register',
  providers: [provideIcons({lucideUser, lucideTrophy, lucideStar})],
  imports: [
    KeyEvent,
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
export class Register {

  tabs = ['user-information', 'goals', 'welcome']

  activeTab = signal<'user-information' | 'goals' | 'welcome'>('user-information')

  tabChanged(tab: string): void {
    this.activeTab.set(tab as 'user-information' | 'goals' | 'welcome')
  }

}
