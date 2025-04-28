import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

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
    constructor( public formBuilder:FormBuilder){
      this.dataForm=this.formBuilder.group({
        FirstNameAr:[''],
        FirstNameEn:[''],
        LastNameAr:[''],
        LastNameEn:[''],
        phone:['']
      })
  
    }
  
    async onSubmit() {
     
    }
  
    resetForm() {
      this.dataForm.reset();
    }

}
