import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  constructor() { }

  public products: Product[] = [
    {
      id: 'p1',
      name: 'Intel® Core™ i9-10885H Processor',
      imageUrl: 'https://www.intel.com/content/dam/www/global/ark/badges/195719_128.gif/jcr:content/renditions/_64.gif',
      price: 8199471,
      qty: 20,
      type: 'cpu',
      model: '10th Generation Intel® Core™ i9 Processor',
      description: 'lorem ipsum dolor sit amet',
      baseClock: '2.4',
      boostClock: '5.3',
      coreCount: '8',
      threadCount: '16',
      speed: null,
      size: null,
      chipset: null,
      processor: null
    },
    {
      id: 'p2',
      name: 'AMD Ryzen™ 9 5950X',
      imageUrl: 'https://www.amd.com/system/files/2020-09/616656-amd-ryzen-9-5000-series-PIB-1260x709_0.png',
      price: 12599000,
      qty: 50,
      type: 'cpu',
      model: 'AMD Ryzen™ 9 Desktop Processors',
      description: 'lorem ipsum dolor sit amet',
      baseClock: '3.4',
      boostClock: '4.9',
      coreCount: '16',
      threadCount: '32',
      speed: null,
      size: null,
      chipset: null,
      processor: null
    },
    {
      id: 'p3',
      name: 'Kingston HyperX Furry DDR4 RGB 16GB (8GB x 2) 2666Mhz',
      imageUrl: 'https://cdn.mwave.com.au/images/400/kingston_hyperx_fury_rgb_16gb_2x_8gb_ddr4_3200mhz_memory_ac26499_8.jpg',
      price: 1999999,
      qty: 10,
      type: 'ram',
      model: 'Kingston HyperX',
      description: 'lorem ipsum dolor sit amet',
      baseClock: null,
      boostClock: null,
      coreCount:  null,
      threadCount: null,
      speed: '2400MHz – 3466MHz',
      size: '16GB',
      chipset: null,
      processor: null
    },
    {
      id: 'p4',
      name: 'MSI B365M Pro-VDH (LGA1151V2, B365, DDR4, USB3.1, SATA',
      imageUrl: 'https://asset.msi.com/resize/image/global/product/product_6_20190705105918_5d1ebd0628a3f.png62405b38c58fe0f07fcef2367d8a9ba1/600.png',
      price: 1275000,
      qty: 10,
      type: 'motherboard',
      model: 'Kingston HyperX',
      description: 'lorem ipsum dolor sit amet',
      baseClock: null,
      boostClock: null,
      coreCount:  null,
      threadCount: null,
      speed: null,
      size: null,
      chipset: 'B365',
      processor: '9th / 8th Gen Intel Core / Pentium Gold / Celeron processors for LGA 1151 socket'
    },
    {
      id: 'p5',
      name: 'GEFORCE RTX 2080 Ti',
      imageUrl: 'https://www.nvidia.com/content/dam/en-zz/Solutions/shop/nvidia-consumer-store-portal-geforce-2080-ti-um@2x.png',
      price: 28950000,
      qty: 17,
      type: 'gpu',
      model: 'GEFORCE RTX',
      description: 'lorem ipsum dolor sit amet',
      baseClock: null,
      boostClock: null,
      coreCount:  null,
      threadCount: null,
      speed: null,
      size: null,
      chipset: null,
      processor: null
    }
  ];

  addProduct(newProduct: Product) {
    this.products.push(newProduct);
    console.log('===this.products', this.products);
  }

  updateProduct(updatedProduct: Product) {
    var index = this.products.findIndex(p => p.id === updatedProduct.id);
    console.log("==indexx", index);
    this.products[index] = updatedProduct;
  }

  deleteProduct(productToDelete: Product) {
    console.log("==delete");
    this.products.splice(this.products.findIndex(function(i){
      return i.id === productToDelete.id;
    }), 1);
  }

  getAllProducts() {
    return [...this.products];
  }

  getAllAvailableProducts() {
    let newArray = [];
    this.products.forEach(product => {
      if(product.qty > 0){
        newArray.push(product);
      }
    });
    return newArray;
  }

  getSingleProduct(productId: string) {
    return {...this.products.find(product => {
      return product.id === productId;
    })}
  }
  
}
