import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { iUserInformationForm } from "./user-information/user-information.model";
import { iHttpResponse } from "@shared/models/http.model";
import { HttpClient } from "@angular/common/http";
import { env } from "@environments/env";
import { iGoal, iGoalsResponse } from "./goals/goals.model";

@Injectable({
  providedIn: 'root',
})
export class RegisterService {

  http = inject(HttpClient);
  private readonly API = env.API;

  private readonly nextStep$ = new Subject<void>();
  private readonly lastStep$ = new Subject<void>();

  constructor() {}

  listenPreviousStep(): Observable<void> {
    return this.lastStep$.asObservable();
  }

  triggerPreviousStep(): void {
    this.lastStep$.next();
  }

  listenNextStep(): Observable<void> {
    return this.nextStep$.asObservable();
  }

  triggerNextStep(): void {
    this.nextStep$.next();
  }

  getGoals(): Observable<iHttpResponse<iGoalsResponse>> {
    return this.http.get<iHttpResponse<iGoalsResponse>>(`${this.API}/api/v1/goal/goals`)
  }

  registerUser(user: iUserInformationForm, goals: string[]): Observable<iHttpResponse<string>> {
    return this.http.post<iHttpResponse<string>>(`${this.API}/api/v1/auth/register`, { ...user, goals })
  }

}
