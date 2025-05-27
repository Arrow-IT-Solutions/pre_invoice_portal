import { Component } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { ProductRequest, ProductUpdateRequest } from '../products.module';
import { ProductService } from 'src/app/layout/service/products.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  providers: [MessageService]
})
export class AddProductComponent {

  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  constructor(public formBuilder: FormBuilder,
    public layoutService: LayoutService,
    public productService: ProductService,
    public messageService: MessageService
  ) {
    this.dataForm = this.formBuilder.group({
      sortID: [''],
      productNameAr: ['', Validators.required],
      productPrice: ['', Validators.required],
      productNameEn: [''],


    })

  }
  get form(): { [key: string]: AbstractControl } {
    return this.dataForm.controls;
  }
  async ngOnInit() {
    try {
      this.loading = true;

      this.resetForm();

      if (this.productService.SelectedData != null) {
        await this.FillData();
      }
    } catch (exceptionVar) {
      console.log(exceptionVar);
    } finally {
      this.loading = false;
    }
  }

  async onSubmit() {
    try {
      this.btnLoading = true;

      if (this.dataForm.invalid) {
        this.submitted = true;
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

    var productTranslation = [
      {
        name: this.dataForm.controls['productNameAr'].value.toString(),
        language: 'ar'
      },
      {
        name: this.dataForm.controls['productNameEn'].value == null ? '' : this.dataForm.controls['productNameEn'].value.toString(),
        language: 'en'
      }
    ];

    if (this.productService.SelectedData != null) {
      // update

      var product: ProductUpdateRequest = {
        uuid: this.productService.SelectedData?.uuid?.toString(),
        sortID: this.dataForm.controls['sortID'].value.toString() == '' ? '0' : this.dataForm.controls['sortID'].value.toString(),
        productTranslation: productTranslation,
        price: this.dataForm.controls['productPrice'].value.toString(),

      };

      response = await this.productService.Update(product);
    } else {
      // add
      var addproduct: ProductRequest = {
        productTranslation: productTranslation,
        sortID: this.dataForm.controls['sortID'].value.toString() == '' ? '0' : this.dataForm.controls['sortID'].value.toString(),
        price: this.dataForm.controls['productPrice'].value.toString(),
      };

      console.log(addproduct)

      response = await this.productService.Add(addproduct);
    }

    if (response?.requestStatus?.toString() == '200') {
      this.layoutService.showSuccess(this.messageService, 'toast', true, response?.requestMessage);
      if (this.productService.SelectedData == null) {
        this.resetForm();
      } else {
        this.productService.Dialog.close();
      }
    } else {
      this.layoutService.showError(this.messageService, 'toast', true, response?.requestMessage);
    }

    this.btnLoading = false;
    this.submitted = false;
  }

  async FillData() {
    let temp = {
      productPrice: Number(this.productService.SelectedData?.price),
      productNameAr: this.productService.SelectedData?.productTranslation!['ar'].name,
      productNameEn: this.productService.SelectedData?.productTranslation!['en'].name,
      sortID: Number(this.productService.SelectedData?.sortID),
    };
    this.dataForm.patchValue(temp);

  }


  resetForm() {
    this.dataForm.reset();
  }
}
