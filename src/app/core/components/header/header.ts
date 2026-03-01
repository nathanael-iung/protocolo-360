import { Component } from '@angular/core';
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucideMenu } from "@ng-icons/lucide";
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';

@Component({
  selector: 'app-header',
  providers: [provideIcons({lucideMenu})],
  imports: [
    NgIcon,
    HlmAvatarImports
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

}
