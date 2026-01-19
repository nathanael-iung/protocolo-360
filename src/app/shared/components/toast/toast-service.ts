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

  private toastrSuccess = new Subject<iToast>();
  private toastrSuccess$ = this.toastrSuccess.asObservable();

  private toastrWarning = new Subject<iToast>();
  toastrWarning$ = this.toastrWarning.asObservable();

  private toastrDanger = new Subject<iToast>();
  toastrDanger$ = this.toastrDanger.asObservable();

  success(message: string, title?: string): void {
    const data = {
      title,
      message
    }
    this.toastrSuccess.next(data)
  }

  listenSuccess(): Observable<iToast> {
    return this.toastrSuccess$
  }

  warning(message: string, title?: string): void {
    const data = {
      title,
      message
    }
    this.toastrWarning.next(data)
  }

  listenWarning(): Observable<iToast> {
    return this.toastrWarning$
  }

  danger(message: string, title?: string): void {
    const data = {
      title,
      message
    }
    this.toastrDanger.next(data)
  }

  listenDanger(): Observable<iToast> {
    return this.toastrDanger$
  }
}
