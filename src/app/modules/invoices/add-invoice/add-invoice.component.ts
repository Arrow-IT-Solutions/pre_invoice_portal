import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
interface Product{
  unity:string;
  tax:number;
  quantity:number;
  price:number;
  discount:number;
  total:number;
}
@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss']
})
export class AddInvoiceComponent {
  btnLoading: boolean = false;
  td:any[]=[0,1,2,3,4,5,6];
  product:Product[];
  pageSize: number = 12;
  first: number = 0;
  totalRecords: number = 0;
  invoiceType: any[] = [
      { nameAr: 'نقدي', nameEn: 'cash', value: 0 },
      { nameAr: 'ذمم', nameEn: 'swear', value: 1 }
    ];
  taxType:any[]=[
      { nameAr: 'شامل', nameEn: 'comprehensive', value: 0 },
      { nameAr: 'معفاة', nameEn: 'exempt', value: 1 },
      { nameAr: 'خاضع', nameEn: 'submissive', value: 2 },
      { nameAr: 'غير خاضع', nameEn: 'Not submissive', value: 3 },
    ];
 



  constructor( public formBuilder:FormBuilder){
    this.product=[
      {
        unity: '',
        tax: 0,
        quantity: 0,
        price: 0,
        discount: 0,
        total: 0
      }
    ];
   
  }
  

}
