import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { ProductsService } from '../../products.service';
import { Product } from '../../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  form: FormGroup;
  isCPU: boolean = false;
  isRAM: boolean = false;
  isMotherboard: boolean = false;
  constructor(
    private productsService: ProductsService,
    private loadingController: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      type: new FormControl(null, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      name: new FormControl(null, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      model: new FormControl(null, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      qty: new FormControl(null, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      imageUrl: new FormControl(null, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      baseClock: new FormControl(null, {
        updateOn: 'blur',
        validators: !this.isCPU ? [Validators.required] : []
      }),
      boostClock: new FormControl(null, {
        updateOn: 'blur',
        validators: !this.isCPU ? [Validators.required] : []
      }),
      coreCount: new FormControl(null, {
        updateOn: 'blur',
        validators: !this.isCPU ? [Validators.required] : []
      }),
      threadCount: new FormControl(null, {
        updateOn: 'blur',
        validators: !this.isCPU ? [Validators.required] : []
      }),
      speed: new FormControl(null, {
        updateOn: 'blur',
        validators: !this.isRAM ? [Validators.required] : []
      }),
      size: new FormControl(null, {
        updateOn: 'blur',
        validators: !this.isRAM ? [Validators.required] : []
      }),
      chipset: new FormControl(null, {
        updateOn: 'blur',
        validators: !this.isMotherboard ? [Validators.required] : []
      }),
      processor: new FormControl(null, {
        updateOn: 'blur',
        validators: !this.isMotherboard ? [Validators.required] : []
      }),
    })
  }

  randomizeId() {
    const id = '_'+Math.random().toString(36).substr(2, 9);
    return id;
  }

  async onSubmit() {
    const newProduct = {
      id: this.randomizeId(),
      ...this.form.value
    }
    // console.log(newProduct)

    this.productsService.addProduct(newProduct);

    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    // console.log(this.productsService.getAllProducts());

    this.loadingController.dismiss();

    this.router.navigate(['/admin']);
  
  }

  onChoose($event) {
    const currentTypeChosen = $event.detail.value;
    if(currentTypeChosen === "cpu") {
      this.isCPU = true;
      this.isRAM = false;
      this.isMotherboard = false;
    } else if (currentTypeChosen === "ram") {
      this.isRAM = true;
      this.isCPU = false;
      this.isMotherboard = false;
    } else if (currentTypeChosen === "motherboard") {
      this.isMotherboard = true;
      this.isCPU = false;
      this.isRAM = false;
    } else {
      this.isCPU = false;
      this.isRAM = false;
      this.isMotherboard = false;
    }
  }

}
