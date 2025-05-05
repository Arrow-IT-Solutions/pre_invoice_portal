import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceForPrintRoutingModule } from './invoice-for-print-routing.module';
import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PrintInvoiceComponent
  ],
  imports: [
    CommonModule,
    InvoiceForPrintRoutingModule,
    SharedModule
  ]
})
export class InvoiceForPrintModule { }
