import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MessageService } from "primeng/api";
import { Subject, takeUntil } from "rxjs";
import { ToastService } from "./toast-service";
import { Toast as PrimeNGToast } from 'primeng/toast';

@Component({
  selector: 'app-toast',
  imports: [PrimeNGToast],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast implements OnInit, OnDestroy {

  toastService = inject(ToastService)
  messageService = inject(MessageService)

  width = ''

  sub$ = new Subject<void>()

  subToastSuccess$ = this.toastService.listenSuccess()
  subToastWarning$ = this.toastService.listenWarning()
  subToastDanger$ = this.toastService.listenDanger()

  ngOnInit(): void {
   this.listenSubsToShowToast()
  }

  listenSubsToShowToast(): void {
    this.subToastSuccess$.pipe(takeUntil(this.sub$)).subscribe(data => {
      this.checkWidth()
      this.messageService.add({
        severity: 'success',
        summary: data?.title ?? '',
        detail: data?.message ?? ''
      })
    })
    this.subToastWarning$.pipe(takeUntil(this.sub$)).subscribe(data => {
      this.checkWidth()
      this.messageService.add({
        severity: 'warn',
        summary: data?.title ?? '',
        detail: data?.message ?? ''
      })
    })
    this.subToastDanger$.pipe(takeUntil(this.sub$)).subscribe(data => {
      this.checkWidth()
      this.messageService.add({
        severity: 'error',
        summary: data?.title ?? '',
        detail: data?.message ?? ''
      })
    })
  }

  checkWidth(): void {
    if(window.innerWidth > 991){
      this.width = '35vw'
    } else {
      this.width = '80vw'
    }
  }

  ngOnDestroy(): void {
    this.sub$.next()
    this.sub$.complete()
  }

}
