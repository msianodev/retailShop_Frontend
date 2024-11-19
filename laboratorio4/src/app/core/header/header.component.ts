import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomePageComponent } from '../../shared/home-page/home-page.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  routes: Routes = [
    { path: '/home', component: HomePageComponent },
    // { path: 'cart', component: SettingsComponent }
  ];
}
