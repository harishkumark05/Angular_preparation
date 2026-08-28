import { Component, Input, TemplateRef } from '@angular/core';
import { Product } from '../eg-template-outlet.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
 @Input() products: Product[] = [];
  @Input() itemTemplate!: TemplateRef<any>;
}
