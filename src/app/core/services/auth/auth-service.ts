import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { env } from "@environments/env.prod";
import { iHttpResponse } from "@shared/models/http.model";
import { iTokenMetadata } from "@shared/models/token.model";
import { Observable, tap } from "rxjs";
import { TokenMetadataService } from "../token-metadata/token-metadata-service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  tokenMetadataService = inject(TokenMetadataService);

  readonly API = env.API
  private http = inject(HttpClient)

  private refreshTimer?: ReturnType<typeof setTimeout>;

  scheduleRefresh(expiresAt: number) {

    if (this.refreshTimer)
      clearTimeout(this.refreshTimer);

    const buffer = 5 * 60 * 1000;
    const delay = expiresAt - Date.now() - buffer;

    if (delay <= 0) {
      this.refresh().subscribe();
    } else {
      this.refreshTimer = setTimeout(() => {
        this.refresh().subscribe();
      }, delay);
    }
  }

  login(email: string, password: string): Observable<iHttpResponse<iTokenMetadata>> {
    return this.http.post<iHttpResponse<iTokenMetadata>>(`${this.API}/api/v1/auth/login`, { email, password })
  }

  logout(): Observable<iHttpResponse<null>> {
    return this.http.post<iHttpResponse<null>>(`${this.API}/api/v1/auth/logout`, {}).pipe(
      tap(() => {
        if (this.refreshTimer)
          clearTimeout(this.refreshTimer);
        this.tokenMetadataService.clearTokenMetadata();
        this.clearSessionHint();
      })
    )
  }

  refresh(): Observable<iHttpResponse<iTokenMetadata>> {
    return this.http.post<iHttpResponse<iTokenMetadata>>(`${this.API}/api/v1/auth/refresh`, {}).pipe(
      tap(res => {
        this.scheduleRefresh(res.data?.exp);
        if (res.data) {
          this.tokenMetadataService.setTokenMetadata(res.data);
        }
      })
    )
  }

  setSessionHint(): void {
    localStorage.setItem('has_session', 'true');
  }

  getsessionHint(): boolean {
    return localStorage.getItem('has_session') === 'true';
  }

  clearSessionHint(): void {
    localStorage.removeItem('has_session');
  }

}
