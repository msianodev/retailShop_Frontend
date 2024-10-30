import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'mat-toolbar-row',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  menuItems: MenuItem[] = [
    { 
      icon: 'store', 
      label: 'Products', 
      route: '/Products' 
    },
    { 
      icon: 'bar_chart', 
      label: 'Sales', 
      route: '/sales' 
    },
    { 
      icon: 'inventory_2', 
      label: 'Inventory', 
      route: '/inventory' 
    },
    { 
      icon: 'people', 
      label: 'Customers', 
      route: '/customers' 
    },
    { 
      icon: 'settings', 
      label: 'Settings', 
      route: '/settings' 
    },
    { 
      icon: 'logout', 
      label: 'Logout', 
      route: '/logout' 
    },
    
  ];
}
