import { Injectable, signal } from '@angular/core';
import { iTokenMetadata } from "@shared/models/token.model";
import { sign } from "crypto";

@Injectable({
  providedIn: 'root',
})
export class TokenMetadataService {
  
  private email = signal<string>('');
  private fullName = signal<string>('');
  private roles = signal<string[]>([]);
  private exp = signal<number>(0);
  private iat = signal<number>(0);

  getEmail(): string {
    return this.email();
  }

  getFullName(): string {
    return this.fullName();
  }

  getRoles(): string[] {
    return this.roles();
  }

  getExp(): number {
    return this.exp();
  }
  
  getIat(): number {
    return this.iat();
  }

  setTokenMetadata(token: iTokenMetadata): void {
    this.email.set(token.email);
    this.fullName.set(token.fullName);
    this.roles.set(token.roles);
    this.exp.set(token.exp);
    this.iat.set(token.iat);
  }

  clearTokenMetadata(): void {
    this.email.set('');
    this.fullName.set('');
    this.roles.set([]);
    this.exp.set(0);
    this.iat.set(0);
  }

}
