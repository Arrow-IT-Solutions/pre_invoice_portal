import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  providers: [MessageService]
})
export class AddEmployeeComponent {
  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  file: any;
  fileInput: any
  img: boolean = true;
  constructor(public formBuilder:FormBuilder){
    this.dataForm=this.formBuilder.group({
      firstNameAr:[''],
      lastNameAr:[''],
      firstNameEn:[''],
      lastNameEn:[''],
      Phone:[''],
      userName:[''],
      email:[''],
      birthDate:['']

    })

  }
  onSubmit(){

  }
  OnSelectFile(file) {
    this.file = file;
    this.img = false;
  }
}
