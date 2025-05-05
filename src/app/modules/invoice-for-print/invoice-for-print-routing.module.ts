import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';

const routes: Routes = [
  {
    path:'',
    component:PrintInvoiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceForPrintRoutingModule { }
