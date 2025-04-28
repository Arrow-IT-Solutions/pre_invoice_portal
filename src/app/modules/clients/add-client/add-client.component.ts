import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/layout/service/clients.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { ImgControlComponent } from 'src/app/layout/component/img-control/img-control.component';
import { ClientRequest, ClientUpdateRequest } from '../clients.module';
import { MessageService } from 'primeng/api';
import { ConstantService } from 'src/app/Core/services/constant.service';
import { ConstantResponse } from 'src/app/Core/services/constant.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
  providers: [MessageService]
})
export class AddClientComponent {
  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  gender: ConstantResponse[] = [];
  file: any;
  fileInput: any
  img: boolean = true;
  constructor(
    public formBuilder: FormBuilder,
    public layoutService: LayoutService,
    public clientService: ClientsService,
    public constantService: ConstantService,
    public messageService: MessageService
  ) {
    this.dataForm = formBuilder.group({
      firstNameAr: ['', Validators.required],
      lastNameAr: ['', Validators.required],
      firstNameEn: [''],
      lastNameEn: [''],
      contryCode: [''],
      clientPhone: ['', Validators.required],
      clientGender: [''],
      password: [''],
      birthDate: ['']

    })
  }
  async ngOnInit() {
    try {
      this.loading = true;
      const GenderResponse = await this.constantService.Search('Gender') as any;
      this.gender = GenderResponse.data;

      this.resetForm();

      if (this.clientService.SelectedData != null) {
        await this.FillData();
      }
    } catch (exceptionVar) {
      console.log(exceptionVar);
    } finally {
      this.loading = false;
    }
  }

  get form(): { [key: string]: AbstractControl } {
    return this.dataForm.controls;
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
    let birthDate = new Date(this.dataForm.controls['birthDate'].value)

    var clientTranslation = [
      {
        firstName: this.dataForm.controls['firstNameAr'].value == null ? '' : this.dataForm.controls['firstNameAr'].value.toString(),
        lastName: this.dataForm.controls['lastNameAr'].value == null ? '' : this.dataForm.controls['lastNameAr'].value.toString(),
        language: 'ar'
      },
      {
        firstName: this.dataForm.controls['firstNameEn'].value == null ? '' : this.dataForm.controls['firstNameEn'].value.toString(),
        lastName: this.dataForm.controls['lastNameEn'].value == null ? '' : this.dataForm.controls['lastNameEn'].value.toString(),
        language: 'en'
      }
    ];

    if (this.clientService.SelectedData != null) {
      // update

      var client: ClientUpdateRequest = {
        uuid: this.clientService.SelectedData?.uuid?.toString(),
        clientTranslation: clientTranslation,
        phone: this.dataForm.controls['clientPhone'].value.toString(),

      };
      console.log(client)
      response = await this.clientService.Update(client);

    } else {
      // add

      var addClient: ClientRequest = {
        clientTranslation: clientTranslation,
        phone: this.dataForm.controls['clientPhone'].value.toString(),
      };
      console.log(addClient)

      response = await this.clientService.Add(addClient);
    }

    if (response?.requestStatus?.toString() == '200') {
      this.layoutService.showSuccess(this.messageService, 'toast', true, response?.requestMessage);
      if (this.clientService.SelectedData == null) {
        this.resetForm();
      } else {
        setTimeout(() => {
          this.clientService.Dialog.adHostChild.viewContainerRef.clear();
          this.clientService.Dialog.adHostDynamic.viewContainerRef.clear();
        }, 600);
      }
    } else {
      this.layoutService.showError(this.messageService, 'toast', true, response?.requestMessage);
    }

    this.btnLoading = false;
    this.submitted = false;
  }

  resetForm() {
    this.dataForm.reset();
  }

  async FillData() {
    let temp = {
      firstNameAr: this.clientService.SelectedData?.clientTranslation!['ar'].firstName,
      lastNameAr: this.clientService.SelectedData?.clientTranslation!['ar'].lastName,
      firstNameEn: this.clientService.SelectedData?.clientTranslation!['en'].firstName,
      lastNameEn: this.clientService.SelectedData?.clientTranslation!['en'].lastName,
      clientPhone: this.clientService.SelectedData?.phone,
    };
    this.dataForm.patchValue(temp);

  }


}
