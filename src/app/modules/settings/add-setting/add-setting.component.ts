import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

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
  constructor( public formBuilder:FormBuilder){
    this.dataForm=this.formBuilder.group({
      location:[''],
      phone:[''],
      email:[''],
      Latestinvoice:[''],
      VatNumber:['']

    })

  }
  async onSubmit() {
   
  }

  resetForm() {
    this.dataForm.reset();
  }
}
