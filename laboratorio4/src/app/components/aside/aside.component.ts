import { Component } from '@angular/core';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  menuItems: MenuItem[] = [
    { 
      icon: 'store', 
      label: 'Products', 
      route: '/products' 
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
