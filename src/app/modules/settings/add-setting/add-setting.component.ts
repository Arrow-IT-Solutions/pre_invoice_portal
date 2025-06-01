import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { SettingRequest, SettingUpdateRequest } from '../../settings/settings.module';
import { SettingsService } from 'src/app/layout/service/settings.service';

@Component({
  selector: 'app-add-setting',
  templateUrl: './add-setting.component.html',
  styleUrls: ['./add-setting.component.scss'],
  providers: [MessageService]
})
export class AddSettingComponent {
  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  file: any;
  fileInput: any
  img: boolean = true;
  constructor(public formBuilder: FormBuilder,
    public layoutService: LayoutService,
    public settingService: SettingsService,
    public messageService: MessageService
  ) {
    this.dataForm = this.formBuilder.group({
      location: [''],
      phone: [''],
      email: [''],
      Latestinvoice: [''],
      VatNumber: [''],
      nameAr: [''],
      nameEn: [''],
      mobile: [''],
      fax: [''],
      subTitleAr: [''],
      subTitleEn: [''],
      invoiceFooterAr: [''],
      invoiceFooterEn: [''],

    })

  }
  async ngOnInit() {
    try {
      this.loading = true;

      if (this.settingService.SelectedData != null) {
        console.log(this.settingService.SelectedData)
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

    var settingTranslation = [
      {
        name: this.dataForm.controls['nameAr'].value.toString(),
        subTitle: this.dataForm.controls['subTitleAr'].value.toString(),
        invoiceFooter: this.dataForm.controls['invoiceFooterAr'].value.toString(),

        language: 'ar'
      },
      {
        name: this.dataForm.controls['nameEn'].value == null ? '' : this.dataForm.controls['nameEn'].value.toString(),
        subTitle: this.dataForm.controls['subTitleEn'].value == null ? '' : this.dataForm.controls['subTitleEn'].value.toString(),
        invoiceFooter: this.dataForm.controls['invoiceFooterEn'].value == null ? '' : this.dataForm.controls['invoiceFooterEn'].value.toString(),
        language: 'en'
      }
    ];

    if (this.settingService.SelectedData != null) {
      // update

      var setting: SettingUpdateRequest = {
        uuid: this.settingService.SelectedData?.uuid?.toString(),
        location: this.dataForm.controls['location'].value.toString(),
        settingTranslation: settingTranslation,
        phone: this.dataForm.controls['phone'].value.toString(),
        email: this.dataForm.controls['email'].value.toString(),
        lastInvoiceNo: this.dataForm.controls['Latestinvoice'].value.toString(),
        vatNo: this.dataForm.controls['VatNumber'].value.toString(),
        logo: this.file,
        mobile: this.dataForm.controls['mobile'].value.toString(),
        fax: this.dataForm.controls['fax'].value.toString(),

      };

      response = await this.settingService.Update(setting);
    } else {
      // add
      var addsetting: SettingRequest = {
        settingTranslation: settingTranslation,
        location: this.dataForm.controls['location'].value.toString(),
        phone: this.dataForm.controls['phone'].value.toString(),
        email: this.dataForm.controls['email'].value.toString(),
        lastInvoiceNo: this.dataForm.controls['Latestinvoice'].value.toString(),
        vatNo: this.dataForm.controls['VatNumber'].value.toString(),
        logo: this.file,
        mobile: this.dataForm.controls['mobile'].value.toString(),
        fax: this.dataForm.controls['fax'].value.toString(),
      };

      console.log('add', addsetting)

      response = await this.settingService.Add(addsetting);
    }

    if (response?.requestStatus?.toString() == '200') {
      this.layoutService.showSuccess(this.messageService, 'toast', true, response?.requestMessage);

      if (this.settingService.SelectedData == null) {
        this.resetForm();

      } else {
        this.settingService.Dialog.Close();
      }
    } else {
      this.layoutService.showError(this.messageService, 'toast', true, response?.requestMessage);
    }

    this.btnLoading = false;
    this.submitted = false;
  }

  async FillData() {
    let temp = {
      location: this.settingService.SelectedData?.location,
      phone: this.settingService.SelectedData?.phone,
      email: this.settingService.SelectedData?.email,
      Latestinvoice: this.settingService.SelectedData?.lastInvoiceNo,
      VatNumber: this.settingService.SelectedData?.vatNo,
      nameAr: this.settingService.SelectedData?.settingTranslation!['ar'].name,
      nameEn: this.settingService.SelectedData?.settingTranslation!['en'].name,
      subTitleAr: this.settingService.SelectedData?.settingTranslation!['en'].subTitle,
      subTitleEn: this.settingService.SelectedData?.settingTranslation!['ar'].subTitle,
      invoiceFooterAr: this.settingService.SelectedData?.settingTranslation!['ar'].invoiceFooter,
      invoiceFooterEn: this.settingService.SelectedData?.settingTranslation!['en'].invoiceFooter,
      mobile: this.settingService.SelectedData?.mobile,
      fax: this.settingService.SelectedData?.fax,
    };
    this.fileInput = this.settingService.SelectedData?.logo,
      this.img = false
    this.dataForm.patchValue(temp);

  }

  resetForm() {
    this.dataForm.reset();
  }

  OnSelectFile(file) {
    this.file = file;
    this.img = false;
  }
}
