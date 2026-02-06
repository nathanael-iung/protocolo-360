import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { env } from "@environments/env.prod";
import { iHttpResponse } from "@shared/models/http.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  readonly API = env.API
  private http = inject(HttpClient)

  login(email: string, password: string): Observable<iHttpResponse<string>> {
    return this.http.post<iHttpResponse<string>>(`${this.API}/api/v1/auth/login`, { email, password })
  }

  logout(): Observable<iHttpResponse<null>> {
    return this.http.post<iHttpResponse<null>>(`${this.API}/api/v1/auth/logout`, {})
  }

  refresh(): Observable<iHttpResponse<null>> {
    return this.http.post<iHttpResponse<null>>(`${this.API}/api/v1/auth/refresh`, {})
  }
  
}
