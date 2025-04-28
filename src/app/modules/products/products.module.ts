import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResponseBase, RequestBase, SearchRequestBase } from 'src/app/shared/class/class';
import { AddProductComponent } from './add-product/add-product.component';


@NgModule({
  declarations: [
    ProductsComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProductsModule { }
export interface ProductResponse extends ResponseBase {

  uuid?: string;
  productTranslation?: { [key: string]: ProductTranslationResponse };
  price: string,

}
export interface ProductSearchRequest extends SearchRequestBase {
  uuid?: string;
  name?: string;

}
export interface ProductUpdateRequest extends RequestBase {
  productTranslation?: ProductTranslationRequest[];
  price: string,
}

export interface ProductRequest extends RequestBase {
  productTranslation?: ProductTranslationRequest[];
  price: string,
}

export interface ProductTranslationResponse {
  uuid?: string;
  name?: string;
  language?: string;
}
export interface ProductTranslationRequest {
  uuid?: string;
  name?: string;
  language?: string;
}
export interface ProductTranslationUpdateRequest {
  uuid?: string;
  name?: string;
}
