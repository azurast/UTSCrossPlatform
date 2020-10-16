import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Product } from '../../product.model';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {
  loadedProduct: Product;
  form: FormGroup;
  isCPU: boolean = false;
  isRAM: boolean = false;
  isMotherboard: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private productsService: ProductsService,
    private router: Router
    ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('productId')) { return; }
      const productId = paramMap.get('productId');
      this.loadedProduct = this.productsService.getSingleProduct(productId);
      this.loadedProduct.type === "cpu" 
      ? this.isCPU = true 
      : this.loadedProduct.type === "ram" 
        ? this.isRAM = true 
        : this.loadedProduct.type === "motherboard" 
          ? this.isMotherboard = true
          : '';
    });
    this.form = new FormGroup({
      name: new FormControl(this.loadedProduct.name, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      model: new FormControl(this.loadedProduct.model, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      price: new FormControl(this.loadedProduct.price, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      qty: new FormControl(this.loadedProduct.qty, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      imageUrl: new FormControl(this.loadedProduct.imageUrl, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      baseClock: new FormControl(this.loadedProduct.baseClock, {
        updateOn: 'blur',
        validators: !this.isCPU ? [Validators.required] : []
      }),
      boostClock: new FormControl(this.loadedProduct.boostClock, {
        updateOn: 'blur',
        validators: !this.isCPU ? [Validators.required] : []
      }),
      coreCount: new FormControl(this.loadedProduct.coreCount, {
        updateOn: 'blur',
        validators: !this.isCPU ? [Validators.required] : []
      }),
      threadCount: new FormControl(this.loadedProduct.threadCount, {
        updateOn: 'blur',
        validators: !this.isCPU ? [Validators.required] : []
      }),
      speed: new FormControl(this.loadedProduct.speed, {
        updateOn: 'blur',
        validators: !this.isRAM ? [Validators.required] : []
      }),
      size: new FormControl(this.loadedProduct.size, {
        updateOn: 'blur',
        validators: !this.isRAM ? [Validators.required] : []
      }),
      chipset: new FormControl(this.loadedProduct.chipset, {
        updateOn: 'blur',
        validators: !this.isMotherboard ? [Validators.required] : []
      }),
      processor: new FormControl(this.loadedProduct.processor, {
        updateOn: 'blur',
        validators: !this.isMotherboard ? [Validators.required] : []
      }),
    })
  }

  async onSubmit() {
    const updatedProduct = {
      id: this.loadedProduct.id,
      type: this.loadedProduct.type,
      ...this.form.value
    }
    // console.log("==id", updatedProduct.id);
    // console.log(updatedProduct)

    this.productsService.updateProduct(updatedProduct);

    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    // console.log(this.productsService.getAllProducts());

    this.loadingController.dismiss();

    this.router.navigate(['/admin']);
  
  }


}
