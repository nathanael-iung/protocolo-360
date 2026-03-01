import { Component, inject, OnInit, signal } from '@angular/core';
import { NgIcon, provideIcons } from "@ng-icons/core";
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { lucideLayoutDashboard, lucideLogOut, lucideMoon, lucideSun } from "@ng-icons/lucide";
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import { TokenMetadataService } from "@core/services/token-metadata/token-metadata-service";
import { getFirstAndLast, getInitials } from "@shared/utils/string";
import { DarkModeService } from "@shared/services/dark-mode/dark-mode-service";
import { AuthService } from "@core/services/auth/auth-service";
import { take, tap } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  providers: [provideIcons({ lucideLayoutDashboard, lucideSun, lucideMoon, lucideLogOut })],
  imports: [
    HlmSidebarImports,
    HlmAvatarImports,
    HlmSeparatorImports,
    NgIcon,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  private tokenMetadataService = inject(TokenMetadataService)
  private darkModeService = inject(DarkModeService)
  private authService = inject(AuthService)
  private router = inject(Router)

  protected readonly _menus = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'lucideLayoutDashboard',
    }
  ];

  nameInitials = signal<string>(getInitials(this.tokenMetadataService.getFullName()))
  firstAndLastName = signal<string>(getFirstAndLast(this.tokenMetadataService.getFullName()))

  isDarkModeEnabled = signal(this.darkModeService.isDarkModeEnabled())

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode()
    this.isDarkModeEnabled.set(this.darkModeService.isDarkModeEnabled())
  }

  logout(): void {
    this.authService.logout()
      .pipe(
        take(1),
        tap(() => this.router.navigate(['login']))
      ).subscribe()
  }

}
