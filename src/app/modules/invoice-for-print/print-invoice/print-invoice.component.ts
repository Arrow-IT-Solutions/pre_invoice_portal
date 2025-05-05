import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from 'src/app/layout/service/invoice.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { PrintService, Setting } from 'src/app/layout/service/printService';

@Component({
  selector: 'app-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrls: ['./print-invoice.component.scss']
})
export class PrintInvoiceComponent {
  @ViewChild('invoiceContent') invoiceContent!: ElementRef;
  id: any;

  elmentContent?:string;

  constructor(public route:Router,public layoutService: LayoutService,public invoiceService:InvoiceService,public printService:PrintService){

  }
  backHome(){
    this.route.navigate(['layout-admin/invoices'])
  }
  print(){
    const content = document.getElementById('invoiceContent')?.outerHTML || '';

    console.log("Content : ",content);
    let config :Setting =
    {
      printerName : this.printService.printerConfig.printerNameReceipt1,
      unit : 'mm',
      orientation  : 'landscape',
      width:297,
      height : 210,
      copies : 1,
      paperSize : 'a4'
    }

    this.printService.Print(content,config);

  }


}
