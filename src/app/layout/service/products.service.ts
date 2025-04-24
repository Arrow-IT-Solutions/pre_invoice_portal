import { Injectable } from "@angular/core";
import { ProductResponse } from "src/app/modules/products/products.module";

@Injectable({
    providedIn: 'root'
  })
  export class ProductService{
    public SelectedData: ProductResponse | null = null;

  }