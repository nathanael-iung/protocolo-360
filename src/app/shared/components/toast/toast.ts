import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { Subject, takeUntil } from "rxjs";
import { ToastService } from "./toast-service";
import { toast } from 'ngx-sonner';
import { HlmToasterImports } from '@spartan-ng/helm/sonner';

enum eToastColor {
  SUCCESS = 'var(--color-green-400)',
  WARNING = 'var(--color-yellow-400)',
  ERROR = 'var(--color-red-400)'
}

@Component({
  selector: 'app-toast',
  imports: [
    HlmToasterImports
  ],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast implements OnInit, OnDestroy {

  toastService = inject(ToastService)

  width = ''

  sub$ = new Subject<void>()

  subToastSuccess$ = this.toastService.listenSuccess()
  subToastWarning$ = this.toastService.listenWarning()
  subToastDanger$ = this.toastService.listenDanger()

  toastColor = signal<eToastColor>(eToastColor.SUCCESS)

  ngOnInit(): void {
   this.listenSubsToShowToast()
  }

  listenSubsToShowToast(): void {
    this.subToastSuccess$.pipe(takeUntil(this.sub$)).subscribe(data => {
      this.checkWidth()
      this.toastColor.set(eToastColor.SUCCESS)
      toast.success(data?.title ?? '', {
        description: data?.message ?? '',
      });
    })
    this.subToastWarning$.pipe(takeUntil(this.sub$)).subscribe(data => {
      this.checkWidth()
      this.toastColor.set(eToastColor.WARNING)
      toast.warning(data?.title ?? '', {
        description: data?.message ?? ''
      });
    })
    this.subToastDanger$.pipe(takeUntil(this.sub$)).subscribe(data => {
      this.checkWidth()
      this.toastColor.set(eToastColor.ERROR)
      toast.error(data?.title ?? '', {
        description: data?.message ?? ''
      });
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
