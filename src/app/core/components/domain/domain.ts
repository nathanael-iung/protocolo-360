import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Sidebar } from "../sidebar/sidebar";

@Component({
  selector: 'app-domain',
  imports: [
    RouterOutlet,
    Sidebar
  ],
  templateUrl: './domain.html',
  styleUrl: './domain.css',
})
export class Domain {

}
