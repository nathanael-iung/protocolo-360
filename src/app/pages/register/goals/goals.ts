import { Component, signal } from '@angular/core';
import { iGoal } from "./goals.model";
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
  selector: 'app-goals',
  imports: [
    ToggleButtonModule
  ],
  templateUrl: './goals.html',
  styleUrl: './goals.css',
})
export class Goals {

  goals = signal<iGoal[]>([
    {
      shortName: 'weight_loss',
      fullName: 'Perder peso'
    },
    {
      shortName: 'weight_maintenance',
      fullName: 'Manter peso'
    },
    {
      shortName: 'weight_gain',
      fullName: 'Ganhar peso'
    },
    {
      shortName: 'diet_plan',
      fullName: 'Planejar dieta'
    },
    {
      shortName: 'workout_routine',
      fullName: 'Acompanhar rotina de treino'
    },
  ])

}
