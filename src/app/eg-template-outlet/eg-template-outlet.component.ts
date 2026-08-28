import { Component } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

@Component({
  selector: 'app-eg-template-outlet',
  templateUrl: './eg-template-outlet.component.html',
  styleUrls: ['./eg-template-outlet.component.css']
})
export class EgTemplateOutletComponent {
 page: 'home' | 'search' | 'admin' = 'home';

  // Imagine this data came from an HTTP API.
  products: Product[] = [
    {
      id: 101,
      name: 'iPhone 16',
      price: 69999,
      category: 'Mobile',
      inStock: true
    },
    {
      id: 102,
      name: 'MacBook Air M3',
      price: 99999,
      category: 'Laptop',
      inStock: true
    },
    {
      id: 103,
      name: 'Samsung Galaxy S25',
      price: 79999,
      category: 'Mobile',
      inStock: false
    }
  ];
}
