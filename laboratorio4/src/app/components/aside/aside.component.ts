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
      icon: 'people', 
      label: 'Employees', 
      route: '/employees' 
    },
    { 
      icon: 'logout', 
      label: 'Logout', 
      route: '/logout' 
    },
    
  ];
}
