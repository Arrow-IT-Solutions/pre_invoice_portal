import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { InvoiceResponse, InvoiceSearchRequest, InvoiceRequest, InvoiceUpdateRequest } from '../invoices.module';
import { InvoiceService } from 'src/app/layout/service/invoice.service';
import { ConstantService } from 'src/app/Core/services/constant.service';
import { ConstantResponse } from 'src/app/Core/services/constant.service';
import { ClientResponse, ClientSearchRequest } from '../../clients/clients.module';
import { ClientsService } from 'src/app/layout/service/clients.service';
import { UserService } from 'src/app/Core/services/user.service';
import { ProductResponse, ProductSearchRequest } from '../../products/products.module';
import { ProductService } from 'src/app/layout/service/products.service';
import { Router } from '@angular/router';
interface Product {
  productIDFK: string;
  unity: string;
  tax: number;
  quantity: number;
  price: number;
  discount: number;
  total: number;
  uuid?: string;

}
@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss'],
  providers: [MessageService]
})
export class AddInvoiceComponent {
  dataForm!: FormGroup;
  btnLoading: boolean = false;
  td: any[] = [0, 1, 2, 3, 4, 5, 6];
  product: Product[];
  pageSize: number = 12;
  first: number = 0;
  totalRecords: number = 0;
  invoiceTypes: ConstantResponse[] = [];
  taxTypes: ConstantResponse[] = [];
  clients: ClientResponse[] = [];
  total: number
  tax: number
  discount: number
  netTotal: number
  products: ProductResponse[] = []
  submitted: boolean = false;
  clientUUID: string
  client: ClientResponse



  constructor(public formBuilder: FormBuilder,
    public constantService: ConstantService,
    public invoiceService: InvoiceService,
    public clientService: ClientsService,
    public layoutService: LayoutService,
    public userService: UserService,
    public messageService: MessageService,
    public productService: ProductService,
    public route: Router,
  ) {
    this.dataForm = this.formBuilder.group({
      invoiceType: ['', Validators.required],
      taxType: ['', Validators.required],
      date: ['', Validators.required],
      note: [''],
      client: [''],
      invoiceItems: this.formBuilder.array([])

    })
    this.product = [{
      productIDFK: '',
      unity: '',
      tax: 0,
      quantity: 0,
      price: 0,
      discount: 0,
      total: 0
    }];


  }

  async ngOnInit() {
    this.dataForm.get('date')!.setValue(new Date());
    if (this.invoiceService.SelectedData != null) {
      if (this.invoiceService.SelectedData.clientIDFK != '-1') {
        await this.FillClientID(this.invoiceService.SelectedData.clientIDFK)
      }
      this.populateFormForEdit();
    }
    const invoiceTypeResponse = await this.constantService.Search('InvoiceType') as any;
    this.invoiceTypes = invoiceTypeResponse.data;
    const taxTypeResponse = await this.constantService.Search('TaxType') as any;
    this.taxTypes = taxTypeResponse.data;
    await this.RetriveClient();
    await this.RetriveProduct();


  }

  private mapInvoiceItems(items: InvoiceResponse['invoiceItems']): Product[] {
    return items.map(i => ({
      productIDFK: i.product.uuid.toString(),
      unity: i.unit,
      tax: Number(i.taxPercentage),
      quantity: Number(i.qty),
      price: Number(i.salePrice),
      discount: Number(i.discountAmount),
      total: Number(i.netPrice),
      uuid: i.uuid
    }));
  }

  private populateFormForEdit(): void {

    const editInv = this.invoiceService.SelectedData!;

    this.dataForm.patchValue({
      invoiceType: Number(editInv.invoiceType),
      taxType: Number(editInv.taxType),
      date: new Date(editInv.date),
      note: editInv.note,
      client: editInv.clientIDFK == '-1' ? '' : this.clientUUID
    });

    this.product = this.mapInvoiceItems(editInv.invoiceItems);


    this.calculateTotals();
  }

  async RetriveClient() {


    let filter: ClientSearchRequest = {

      name: '',
      uuid: '',
      pageIndex: "",
      pageSize: '100000'

    }
    const response = await this.clientService.Search(filter) as any

    this.clients = response.data,

      await this.ReWriteClient();

  }

  async RetriveProduct() {


    let filter: ProductSearchRequest = {

      name: '',
      uuid: '',
      pageIndex: "",
      pageSize: '100000'

    }
    const response = await this.productService.Search(filter) as any

    this.products = response.data,

      await this.ReWriteProduct();

  }

  ReWriteClient(): any {

    var clientDTO: any[] = []

    this.clients.map(client => {
      const translation = client.clientTranslation?.[this.layoutService.config.lang] as any;
      const firstName = translation?.firstName;
      const lastName = translation?.lastName;

      var obj =
      {
        ...client,
        fullName: `${firstName} ${lastName}`.trim()

      }

      clientDTO.push(obj)

    })

    this.clients = clientDTO;

  }

  ReWriteProduct(): any {

    var productDTO: any[] = []

    this.products.map(product => {
      const translation = product.productTranslation?.[this.layoutService.config.lang] as any;
      const name = translation?.name;

      var obj =
      {
        ...product,
        name: `${name}`.trim()

      }

      productDTO.push(obj)

    })

    this.products = productDTO;

  }

  async FillClient(event: any = null) {

    let filterInput = '';
    if (event != null) {
      filterInput = event.filter
    }

    let filter: ClientSearchRequest = {

      name: filterInput,
      uuid: '',
      pageIndex: "",
      pageSize: '100000'
    }
    const response = await this.clientService.Search(filter) as any

    this.clients = response.data
    await this.ReWriteClient();
  }

  async FillProduct(event: any = null) {

    let filterInput = '';
    if (event != null) {
      filterInput = event.filter
    }

    let filter: ProductSearchRequest = {

      name: filterInput,
      uuid: '',
      pageIndex: "",
      pageSize: '100000'
    }
    const response = await this.productService.Search(filter) as any

    this.clients = response.data;
    await this.ReWriteProduct();
  }


  async onSubmit() {
    try {
      this.btnLoading = true;
      if (this.dataForm.invalid) {
        this.submitted = true;
        return;
      }

      if (!this.hasValidProductList()) {
        this.btnLoading = false;
        let message = this.layoutService.config.lang == 'en'
          ? 'Please add at least one product and fill out all its fields.'
          : 'الرجاء اضافة صنف واحد على الاقل للاستمرار'

        this.layoutService.showError(this.messageService, 'toast', true, message);
        return;
      }

      if (!this.allTotalsPositive()) {
        this.btnLoading = false;
        const msg = this.layoutService.config.lang === 'en'
          ? 'Each product total must be greater than zero.'
          : 'يجب أن يكون مجموع كل صنف أكبر من صفر';
        this.layoutService.showError(this.messageService, 'toast', true, msg);
        return;
      }
      await this.Save();
    } catch (exceptionVar) {
    } finally {
      this.btnLoading = false;
    }
  }

  async Save() {
    let response;
    let date = new Date(this.dataForm.controls['date'].value)

    if (this.invoiceService.SelectedData != null) {
      // update

      var invoice: InvoiceUpdateRequest = {
        uuid: this.invoiceService.SelectedData.uuid,
        invoiceType: this.dataForm.controls['invoiceType'].value.toString(),
        taxType: this.dataForm.controls['taxType'].value.toString(),
        date: date.toISOString(),
        clientIDFK: this.dataForm.controls['client'].value == '' ? '-1' : this.dataForm.controls['client'].value.toString(),
        note: this.dataForm.controls['note'].value.toString(),
        invoiceItems: [],
        employeeIDFK: this.userService.currentUser.loggedInUser.toString(),
        total: this.total.toString(),
        tax: this.tax.toString(),
        discount: this.discount.toString()

      };
      invoice.invoiceItems = this.product.map(item => {
        const discPct = 0;
        return {
          productIDFK: item.productIDFK,
          taxPercentage: item.tax.toString(),
          unit: item.unity,
          qty: item.quantity.toString(),
          salePrice: item.price.toString(),
          discountPercentage: discPct.toFixed(2),
          discountAmount: item.discount.toString(),
          netPrice: item.total.toString(),
          invoiceIDFK: '',
          uuid: item.uuid
        };
      });

      response = await this.invoiceService.Update(invoice);
      console.log(response)
    } else {
      // add

      var addinvoice: InvoiceRequest = {
        invoiceType: this.dataForm.controls['invoiceType'].value.toString(),
        taxType: this.dataForm.controls['taxType'].value.toString(),
        date: date.toISOString(),
        clientIDFK: this.dataForm.controls['client'].value == '' ? '-1' : this.dataForm.controls['client'].value.toString(),
        note: this.dataForm.controls['note'].value.toString(),
        invoiceItems: [],
        employeeIDFK: this.userService.currentUser.loggedInUser.toString(),
        total: this.total.toString(),
        tax: this.tax.toString(),
        discount: this.discount.toString()

      };

      addinvoice.invoiceItems = this.product.map(item => {
        const discPct = 0;
        return {
          productIDFK: item.productIDFK,
          taxPercentage: item.tax.toString(),
          unit: item.unity,
          qty: item.quantity.toString(),
          salePrice: item.price.toString(),
          discountPercentage: discPct.toFixed(2),
          discountAmount: item.discount.toString(),
          netPrice: item.total.toString(),
          invoiceIDFK: ''
        };
      });

      console.log('Payload:', addinvoice);

      response = await this.invoiceService.Add(addinvoice);
    }

    if (response?.requestStatus?.toString() == '200') {
      this.layoutService.showSuccess(this.messageService, 'toast', true, response?.requestMessage);
      this.resetForm();
      console.log(response)
      this.Print(response)
      if (this.invoiceService.SelectedData == null) {
      } else {
        this.resetForm();


      }
    } else {
      this.layoutService.showError(this.messageService, 'toast', true, response?.requestMessage);
    }

    this.btnLoading = false;
    this.submitted = false;
  }

  resetForm() {
    this.dataForm.reset();
    this.dataForm.get('date')!.setValue(new Date());


    this.product = [{
      productIDFK: '',
      unity: '',
      tax: 0,
      quantity: 0,
      price: 0,
      discount: 0,
      total: 0
    }];

    this.calculateTotals();


    this.submitted = false;
  }

  addRow() {
    this.product.push({
      productIDFK: '',
      unity: '',
      tax: 0,
      quantity: 0,
      price: 0,
      discount: 0,
      total: 0
    });
  }

  removeRow(index: number) {
    this.product.splice(index, 1);

    this.calculateTotals();
  }

  onItemChange(item: Product) {
    const raw = item.total = (item.quantity
      * item.price)
      * (1 + item.tax / 100) - (item.discount);


    const roundedTotal = Math.round(raw * 10000) / 10000;
    item.total = roundedTotal;

    item.tax = Math.round(item.tax * 10000) / 10000;
    item.price = Math.round(item.price * 10000) / 10000;
    item.quantity = Math.round(item.quantity * 10000) / 10000;
    item.discount = Math.round(item.discount * 10000) / 10000;

    this.calculateTotals();
  }

  calculateTotals() {

    this.discount = this.product.reduce(
      (sum, item) => sum + Number(item.discount || 0),
      0
    );

    this.total = this.product.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    this.tax = this.product.reduce(
      (sum, item) => sum + item.price * item.quantity * (item.tax / 100),
      0
    );

    this.netTotal = this.total - this.discount + this.tax;


    this.discount = parseFloat(this.discount.toFixed(4));
    this.total = parseFloat(this.total.toFixed(4));
    this.tax = parseFloat(this.tax.toFixed(4));
    this.netTotal = parseFloat(this.netTotal.toFixed(4));


  }

  onProductSelect(productUuid: string, rowIndex: number) {
    const sel = this.products.find(p => p.uuid === productUuid);
    if (!sel) return;

    this.product[rowIndex].productIDFK = productUuid;
    this.product[rowIndex].price = Number(sel.price);
    this.product[rowIndex].total = Number(sel.price);
    this.onItemChange(this.product[rowIndex]);
  }

  private hasValidProductList(): boolean {

    if (!Array.isArray(this.product) || this.product.length === 0) {
      return false;
    }
    return this.product.some(item =>
      Object.values(item).every(
        v => v !== null && v !== undefined && v !== ''
      )
    );
  }

  private allTotalsPositive(): boolean {

    if (!Array.isArray(this.product) || this.product.length === 0) {
      return false;
    }
    return this.product.every(item => item.total > 0);
  }

  async FillClientID(id: any = null): Promise<string> {


    const response = await this.clientService.GetByID(id) as any
    this.client = response
    this.clientUUID = this.client.uuid.toString()
    console.log(this.clientUUID)

    return this.clientUUID.toString()

  }

  Print(row: InvoiceResponse | null = null) {

    this.invoiceService.SelectedData = row
    this.route.navigate(['printInvoice'], { queryParams: { id: row?.uuid } });
  }

}
