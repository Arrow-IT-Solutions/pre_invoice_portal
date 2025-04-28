import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientResponse } from '../clients.module';
import { ClientsService } from 'src/app/layout/service/clients.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { AddClientComponent } from '../add-client/add-client.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  dataForm!:FormGroup;
  loading = false;
  pageSize: number = 12;
  first: number = 0;
  totalRecords: number = 0;
  constructor(public formBuilder:FormBuilder,public client:ClientsService,public layoutService:LayoutService){
      this.dataForm=this.formBuilder.group({
        clientName:[''],
        phoneNum:['']       
      })
    }
    openAddClient(row: ClientResponse | null = null){
        window.scrollTo({ top: 0, behavior: 'smooth' });
          document.body.style.overflow = 'hidden';
          this.client.SelectedData = row;
          let content = this.client.SelectedData == null ? 'Create_Client' : 'Update_Client';
         
          var component = this.layoutService.OpenDialog(AddClientComponent, content);
    }

}
