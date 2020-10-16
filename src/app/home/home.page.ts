import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  products: Product[];
  isGridView: boolean = false;
  constructor(private productsService: ProductsService) {}

  switchView() {
    this.isGridView = !this.isGridView;
  }
  ngOnInit() {
    this.products = this.productsService.getAllAvailableProducts();
  }

  ionViewWillEnter(){
    this.products = this.productsService.getAllAvailableProducts();
  }
  
}
