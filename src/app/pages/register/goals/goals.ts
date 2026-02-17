import { Component, inject, OnInit, output, signal } from '@angular/core';
import { iGoal } from "./goals.model";
import { Goals as eGoals } from "@shared/enum/goals";
import { HlmToggleImports } from '@spartan-ng/helm/toggle';
import { HlmToggleGroupImports } from '@spartan-ng/helm/toggle-group';
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { RegisterService } from "../register-service";
import { ToastService } from "@shared/components/toast/toast-service";
import { AsyncPipe } from "@angular/common";
import { HlmSkeletonImports } from '@spartan-ng/helm/skeleton';

  @Component({
  selector: 'app-goals',
  imports: [
    HlmToggleImports,
    HlmToggleGroupImports,
    HlmButtonImports,
    AsyncPipe,
    HlmSkeletonImports
],
  templateUrl: './goals.html',
  styleUrl: './goals.css',
})
export class Goals {

  registerService = inject(RegisterService);
  toastService = inject(ToastService);

  selectedGoals = output<string[]>();
  goalsSelected = signal<string[]>([]);

  goals = signal<iGoal[]>([])

  goals$ = this.registerService.getGoals();

  goalChanged(selected: string[]): void {
    this.goalsSelected.set(selected);
    this.selectedGoals.emit(selected);
  }

  nextStep(): void {
    if(this.goalsSelected().length){
      this.registerService.triggerNextStep();
    } else {
      this.toastService.danger('Selecione pelo menos um objetivo para prosseguir');
    }
  }

  previousStep(): void {
    this.registerService.triggerPreviousStep();
  }

}
