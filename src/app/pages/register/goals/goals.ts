import { Component, signal } from '@angular/core';
import { iGoal } from "./goals.model";
import { Goals as eGoals } from "@shared/enum/goals";
import { HlmToggleImports } from '@spartan-ng/helm/toggle';
import { HlmToggleGroupImports } from '@spartan-ng/helm/toggle-group';

@Component({
  selector: 'app-goals',
  imports: [
    HlmToggleImports,
    HlmToggleGroupImports
  ],
  templateUrl: './goals.html',
  styleUrl: './goals.css',
})
export class Goals {

  goals = signal<iGoal[]>([
    {
      shortName: eGoals.WEIGHT_LOSS,
      fullName: 'Perder peso'
    },
    {
      shortName: eGoals.WEIGHT_MAINTENANCE,
      fullName: 'Manter peso'
    },
    {
      shortName: eGoals.WEIGHT_GAIN,
      fullName: 'Ganhar peso'
    },
    {
      shortName: eGoals.DIET_PLAN,
      fullName: 'Planejar dieta'
    },
    {
      shortName: eGoals.WORKOUT_ROUTINE,
      fullName: 'Acompanhar rotina de treino'
    },
  ])

  goalChanged(selected: Array<number>): void {
    console.log(selected);
  }

}
