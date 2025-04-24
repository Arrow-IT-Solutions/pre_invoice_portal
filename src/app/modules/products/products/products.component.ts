import { Component } from '@angular/core';
import { ProductResponse } from '../products.module';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { ProductService } from 'src/app/layout/service/products.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  loading = false;
  pageSize: number = 12;
  first: number = 0;
  totalRecords: number = 0;
  dataForm!:FormGroup;
  constructor(public layoutService: LayoutService, public product:ProductService,public formBuilder:FormBuilder){
    this.dataForm=this.formBuilder.group({
      productName:['']
    })

  }


  OpenDialog(row: ProductResponse | null = null) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.style.overflow = 'hidden';
    this.product.SelectedData = row;
    let content = this.product.SelectedData == null ? 'Create_Product' : 'Update_ِProduct';
   
    var component = this.layoutService.OpenDialog(AddProductComponent, content);
   
  }
}
