import { Component } from '@angular/core';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  routes: Routes = [      
    { path: '/home', component: HomePageComponent },
    // { path: 'cart', component: SettingsComponent }
  ];
}
