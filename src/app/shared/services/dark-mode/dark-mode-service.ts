import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {

  private isDarkMode = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const element = document.querySelector('html')!;
    if (this.isDarkMode) {
      element.classList.add('dark');
    } else {
      element.classList.remove('dark');
    }
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  isDarkModeEnabled(): boolean {
    return !!document.querySelector('html')?.classList?.contains('dark');
  }

}
