import { Injectable } from "@angular/core";
import { EmployeesResponse } from "src/app/modules/employees/employees.module";

@Injectable({
    providedIn: 'root'
  })

  export class EmployeesService{
    public SelectedData: EmployeesResponse | null = null;

  }