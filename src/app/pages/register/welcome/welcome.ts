import { Component, inject, output } from '@angular/core';
import { Router } from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucidePartyPopper } from "@ng-icons/lucide";
import { KeyEvent } from "@shared/directives/key-event/key-event";
import { HlmButtonImports } from "@spartan-ng/helm/button";

@Component({
  selector: 'app-welcome',
  providers: [provideIcons({lucidePartyPopper})],
  imports: [
    KeyEvent,
    HlmButtonImports,
    NgIcon
  ],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome {

  router = inject(Router);

  submitFields = output<void>()

  nextStep(): void {
    this.submitFields.emit();
  }

}
