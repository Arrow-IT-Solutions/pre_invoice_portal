import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { InvoiceResponse, InvoiceSearchRequest } from '../invoices.module';
import { InvoiceService } from 'src/app/layout/service/invoice.service';
import { ConstantService } from 'src/app/Core/services/constant.service';
import { ConstantResponse } from 'src/app/Core/services/constant.service';


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class InvoicesComponent {
  dataForm!: FormGroup;
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
  totalRecords: number = 0;
  pageSize: number = 12;
  first: number = 0;
  loading = false;
  visible: boolean = false;
  invoiceTypes: ConstantResponse[] = [];
  taxTypes: ConstantResponse[] = [];
  invoiceStatus: ConstantResponse[] = [];
  data: InvoiceResponse[] = [];


  constructor(public formBuilder: FormBuilder,
    public route: Router,
    public translate: TranslateService,
    public layoutService: LayoutService,
    public messageService: MessageService,
    public confirmationService: ConfirmationService,
    public invoiceService: InvoiceService,
    public constantService: ConstantService
  ) {
    this.dataForm = this.formBuilder.group({
      fromDate: [''],
      toDate: [''],
      invoiceType: [''],
      clientAccount: [''],
      taxType: [''],
      invoiceStatus: [''],
      invoiceNum: ['']

    })
  }

  OnChange() {
    if (this.isResetting) { return }; // Do nothing if resetting

    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.FillData();
    }, this.doneTypingInterval);

  }

  async ngOnInit() {

    await this.FillData();
    const invoiceTypeResponse = await this.constantService.Search('InvoiceType') as any;
    this.invoiceTypes = invoiceTypeResponse.data;
    const taxTypeResponse = await this.constantService.Search('TaxType') as any;
    this.taxTypes = taxTypeResponse.data;
    const transferResponse = await this.constantService.Search('TransferStatus') as any;
    this.invoiceStatus = transferResponse.data;
  }

  Search() {
    this.FillData();
  }

  async FillData(pageIndex: number = 0) {
    this.loading = true;
    let fromDate
    if (this.dataForm.controls['fromDate'].value == null || this.dataForm.controls['fromDate'].value == '') {
      fromDate = '';
    }
    else {
      fromDate = new Date(this.dataForm.controls['fromDate'].value.toISOString())
    }
    let toDate
    if (this.dataForm.controls['toDate'].value == null || this.dataForm.controls['toDate'].value == '') {
      toDate = '';
    } else {
      toDate = new Date(this.dataForm.controls['toDate'].value.toISOString());
    }
    this.data = [];
    this.totalRecords = 0;
    let filter: InvoiceSearchRequest = {
      uuid: '',
      fromDate: fromDate.toLocaleString(),
      toDate: toDate.toLocaleString(),
      invoiceType: this.dataForm.controls['invoiceType'].value == -1 ? '' : this.dataForm.controls['invoiceType'].value.toString(),
      clientName: this.dataForm.controls['clientAccount'].value,
      taxType: this.dataForm.controls['taxType'].value == -1 ? '' : this.dataForm.controls['taxType'].value.toString(),
      isTransferred: this.dataForm.controls['invoiceStatus'].value == -1 ? '' : this.dataForm.controls['invoiceStatus'].value.toString(),
      invoiceNo: this.dataForm.controls['invoiceNum'].value.toString(),
      includeClient: '0',
      includeEmployee: '1',
      includeItems: '1',
      employeeName: '',
      pageIndex: pageIndex.toString(),
      pageSize: this.pageSize.toString()
    };

    console.log(filter)

    const response = (await this.invoiceService.Search(filter)) as any;

    if (response.data == null || response.data.length == 0) {
      this.data = [];
      this.totalRecords = 0;
    } else if (response.data != null && response.data.length != 0) {
      this.data = response.data;
      this.totalRecords = response.data[0];
    }

    this.totalRecords = response.totalRecords;

    this.loading = false;
  }

  async resetform() {
    this.isResetting = true;
    this.dataForm.reset();
    await this.FillData();
    this.isResetting = false;
  }

  paginate(event: any) {
    this.pageSize = event.rows
    this.first = event.first
    this.FillData(event.first)

  }

  openAddInvoice() {
    this.route.navigate(['layout-admin/invoices/add-invoice'])
  }

  confirmDelete(row: InvoiceResponse) {

    console.log(row)
    this.confirmationService.confirm({
      message: "Do_you_want_to_delete_this_record?",
      header: "Delete_Confirmation",
      icon: 'pi pi-info-circle',
      key: 'positionDialog',
      closeOnEscape: true,
      accept: async () => {
        const response = (await this.invoiceService.Delete(row.uuid!)) as any;

        this.confirmationService.close();

        this.layoutService.showSuccess(this.messageService, 'toste', true, response.requestMessage);

        this.FillData();

      },
      reject: () => {
        // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      },
    });
  }

}
