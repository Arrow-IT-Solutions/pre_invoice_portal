import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent {
  dataForm!: FormGroup;
  loading = false;
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
  invoiceStatus:any[]=[
    { nameAr: 'مرحل للفوترة', nameEn: 'billed', value: 0 },
    { nameAr: 'غير مرحل للفوترة', nameEn: 'Not billed', value: 1 },

  ]

  constructor(public formBuilder:FormBuilder,public route:Router){
    this.dataForm=this.formBuilder.group({
      invoiceDate:[''],
      invoiceType:[''],
      clientAccount:[''],
      notes:[''],
      taxType:[''],
      invoiceStatus:[''],
      invoiceNum:['']
     
    })
  }
  openAddInvoice(){
    this.route.navigate(['layout-admin/invoices/add-invoice'])
  }

}
