import { Component, OnInit, inject, signal } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { slideInAnimation } from "./shared/utils/route-animations";
import { LoadingService } from "./shared/services/loading/loading-service";
import { Loading } from "./shared/components/loading/loading";
import { CommonModule } from "@angular/common";
import { Toast } from "@shared/components/toast/toast";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Loading,
    CommonModule,
    Toast
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [slideInAnimation]
})
export class App {

  contexts = inject(ChildrenOutletContexts)

  loadingService = inject(LoadingService)
  loading$ = this.loadingService.listenLoadingState()

  protected readonly title = signal('protocolo-360');

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

}
