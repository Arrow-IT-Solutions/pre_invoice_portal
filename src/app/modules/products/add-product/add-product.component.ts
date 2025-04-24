import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

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
  constructor( public formBuilder:FormBuilder){
    this.dataForm=this.formBuilder.group({
      productName:[''],
      productPrice:['']

    })

  }

  async onSubmit() {
   
  }

  resetForm() {
    this.dataForm.reset();
  }
}
