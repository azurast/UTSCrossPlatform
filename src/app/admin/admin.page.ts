import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product.model';
import { Router } from '@angular/router';
import { IonItemSliding, ModalController, AlertController } from '@ionic/angular';
import { DeleteModalComponent } from '../component/delete-modal/delete-modal.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  products: Product[];
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.products = this.productsService.getAllProducts();
  }

  ionViewWillEnter(){
    this.products = this.productsService.getAllProducts();
  }

  add() {
    this.router.navigate(['/admin/add-product']);
  }

  edit(product: Product, slidingItem: IonItemSliding) {
    console.log("===edit");
    slidingItem.close();
    this.router.navigate(['/admin/edit-product', product.id]);
  }

  async delete(product: Product, slidingItem: IonItemSliding) {
    slidingItem.close();
    const alert = await this.alertCtrl.create({
      header: 'Delete this product ?',
      subHeader: product.name,
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }, {
        text: 'Yes',
        handler: () => {
          console.log('Confirm Okay');
          this.productsService.deleteProduct(product);
          console.log(this.productsService.getAllProducts());
        }
      }]
    });
    await alert.present();
    alert.onDidDismiss().then(() => this.products = this.productsService.getAllProducts())
  }

}
