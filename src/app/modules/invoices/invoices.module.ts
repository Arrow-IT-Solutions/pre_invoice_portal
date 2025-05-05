import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices/invoices.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { ResponseBase, RequestBase, SearchRequestBase } from 'src/app/shared/class/class';
import { ClientResponse } from '../clients/clients.module';
import { EmployeesResponse } from '../employees/employees.module';
import { ProductResponse } from '../products/products.module';


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

export interface InvoiceResponse extends ResponseBase {

  uuid?: string;
  invoiceItems: InvoiceItemResponse[];
  employee: EmployeesResponse;
  employeeIDFK: string;
  client: ClientResponse;
  clientIDFK: string;
  note: string;
  date: string;
  taxType: string;
  taxTypeValue: string;
  total: string;
  invoiceNo: string;
  discount: string;
  tax: string;
  isTransferred: string;
  transferValue: string;
  invoiceType: string;
  invoiceTypeValue: string;

}
export interface InvoiceSearchRequest extends SearchRequestBase {
  uuid?: string;
  invoiceNo: string;
  clientName: string;
  employeeName: string;
  isTransferred: string;
  includeClient: string;
  includeEmployee: string;
  includeItems: string;
  fromDate: string;
  toDate: string;
  taxType: string;
  invoiceType: string;

}
export interface InvoiceUpdateRequest extends RequestBase {
  employeeIDFK: string;
  clientIDFK: string;
  note: string;
  taxType: string;
  total: string;
  discount: string;
  tax: string;
  invoiceItems: InvoiceItemRequest[];
  invoiceType: string;
  date: string
}

export interface InvoiceRequest extends RequestBase {
  employeeIDFK: string;
  clientIDFK: string;
  note: string;
  taxType: string;
  total: string;
  discount: string;
  tax: string;
  invoiceItems: InvoiceItemRequest[];
  invoiceType: string;
  date: string
}

export interface InvoiceItemRequest extends RequestBase {
  productIDFK: string;
  taxPercentage: string;
  unit: string;
  qty: string;
  salePrice: string;
  discountPercentage: string;
  discountAmount: string;
  netPrice: string;
  invoiceIDFK: string;
}

export interface InvoiceItemUpdateRequest extends RequestBase {
  productIDFK: string;
  taxPercentage: string;
  unit: string;
  qty: string;
  salePrice: string;
  discountPercentage: string;
  discountAmount: string;
  netPrice: string;
}

export interface InvoiceItemResponse extends ResponseBase {

  uuid?: string;
  invoiceIDFK: string;
  productIDFK: string;
  taxPercentage: string;
  unit: string;
  qty: string;
  salePrice: string;
  discountPercentage: string;
  discountAmount: string;
  netPrice: string;
  invoice: InvoiceResponse;
  product: ProductResponse;

}


