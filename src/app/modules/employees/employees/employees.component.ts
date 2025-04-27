import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeesService } from 'src/app/layout/service/employees.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { EmployeesResponse, employeeTranslationResponse } from '../employees.module';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {
 dataForm!:FormGroup;
  loading = false;
  pageSize: number = 12;
  first: number = 0;
  totalRecords: number = 0;
  constructor(public formBuilder:FormBuilder,public employee:EmployeesService,public layoutService:LayoutService){
      this.dataForm=this.formBuilder.group({
        employeeName:[''],
        phoneNum:[''],
        Username:[''],
        email:['']       
      })
    }
    getFirstChar(trans: { [key: string]: employeeTranslationResponse } | undefined): string {
      console.log('xxxxxxxxxxxxxxxx');
  
      console.log('trans : ', trans);
      var char = 'U';
  
      if (trans == undefined || trans == null) {
        char = this.layoutService.config.lang == 'ar' ? 'غ' : 'U';
      } else {
        var response;
  
        if (this.layoutService.config.lang == 'ar') {
          response = trans!['ar'];
          char = response == null ? 'غ' : response!.firstName!.split('')[0].toUpperCase();
        } else {
          response = trans!['en'];
          char = response == null ? 'U' : response!.firstName!.split('')[0].toUpperCase();
        }
      }
      console.log('char : ', char);
  
      return char;
    }
      OpenDialog(row: EmployeesResponse | null = null) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.style.overflow = 'hidden';
        this.employee.SelectedData = row;
        let content = this.employee.SelectedData == null ? 'Create_Employee' : 'Update_Employee';
       
        var component = this.layoutService.OpenDialog(AddEmployeeComponent, content);
       
      }
}
