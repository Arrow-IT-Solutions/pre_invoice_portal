import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices/invoices.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';


@NgModule({
  declarations: [
    InvoicesComponent,
    AddInvoiceComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class InvoicesModule { }
