import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";

interface iToast {
  title?: string,
  message: string
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  private toastSuccess = new Subject<iToast>();
  private toastSuccess$ = this.toastSuccess.asObservable();

  private toastWarning = new Subject<iToast>();
  private toastWarning$ = this.toastWarning.asObservable();

  private toastDanger = new Subject<iToast>();
  private toastDanger$ = this.toastDanger.asObservable();

  success(message: string, title?: string): void {
    const data = {
      title,
      message
    }
    this.toastSuccess.next(data)
  }

  listenSuccess(): Observable<iToast> {
    return this.toastSuccess$
  }

  warning(message: string, title?: string): void {
    const data = {
      title,
      message
    }
    this.toastWarning.next(data)
  }

  listenWarning(): Observable<iToast> {
    return this.toastWarning$
  }

  danger(message: string, title?: string): void {
    const data = {
      title,
      message
    }
    this.toastDanger.next(data)
  }

  listenDanger(): Observable<iToast> {
    return this.toastDanger$
  }
}
