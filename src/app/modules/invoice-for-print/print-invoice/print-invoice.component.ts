import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from 'src/app/layout/service/invoice.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { PrintService, Setting } from 'src/app/layout/service/printService';
import { InvoiceResponse } from '../../invoices/invoices.module';
import { ClientsService } from 'src/app/layout/service/clients.service';
import { ClientResponse, ClientSearchRequest } from '../../clients/clients.module';
import { SettingResponse, SettingSearchRequest } from '../../settings/settings.module';
import { SettingsService } from 'src/app/layout/service/settings.service';
import { LocalService } from 'src/app/shared/service/local.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrls: ['./print-invoice.component.scss']
})
export class PrintInvoiceComponent {
  @ViewChild('invoiceContent') invoiceContent!: ElementRef;
  id: any;
  invoiceResponse: InvoiceResponse | null
  client: ClientResponse
  elmentContent?: string;
  setting: SettingResponse;
  only: any

  netTotal: Number

  constructor(public route: Router,
    public layoutService: LayoutService,
    public invoiceService: InvoiceService,
    public printService: PrintService,
    public clientService: ClientsService,
    public settingSerice: SettingsService,
    public localService: LocalService) {

  }

  async ngOnInit() {
    this.invoiceResponse = this.invoiceService.SelectedData
    await this.RetriveSettings()


    if (this.invoiceResponse?.clientIDFK != '-1') {
      await this.FillClientID(this.invoiceService.SelectedData?.clientIDFK)
    }
    this.FillData();

  }

  FillData() {
    this.netTotal = Number(this.invoiceResponse?.total) + Number(this.invoiceResponse?.tax) - Number(this.invoiceResponse?.discount)

    this.GetAmountInWords();

  }
  backHome() {
    this.route.navigate(['layout-admin/invoices'])
  }
  print() {
    const content = document.getElementById('invoiceContent')?.outerHTML || '';

    console.log("Content : ", content);
    let config: Setting =
    {
      printerName: this.printService.printerConfig.printerNameReceipt1,
      unit: 'mm',
      orientation: 'landscape',
      width: 297,
      height: 210,
      copies: 1,
      paperSize: 'a4'
    }

    this.printService.Print(content, config);

  }

  async FillClientID(id: any = null) {


    const response = await this.clientService.GetByID(id) as any
    this.client = response

  }

  async RetriveSettings() {


    let filter: SettingSearchRequest = {

      name: '',
      uuid: '',
      pageIndex: "",
      pageSize: '100000'

    }
    const response = await this.settingSerice.Search(filter) as any

    this.setting = response.data[0];

  }

  async GetAmountInWords() {
    if (this.layoutService.config.lang == "en")
      this.only = this.localService.amountToEnglishJD(Number(this.netTotal)).toString()
    else
      this.only = this.localService.amountToArabicJD(Number(this.netTotal)).toString()
  }


}

