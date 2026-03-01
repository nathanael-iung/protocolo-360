import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Header } from "../header/header";

@Component({
  selector: 'app-domain',
  imports: [
    RouterOutlet,
    Header
  ],
  templateUrl: './domain.html',
  styleUrl: './domain.css',
})
export class Domain {

}
