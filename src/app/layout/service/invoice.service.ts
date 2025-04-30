import { Injectable } from "@angular/core";
import { LayoutService } from 'src/app/layout/service/layout.service';
import { HttpClientService } from "src/app/Core/services/http-client.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InvoiceResponse, InvoiceRequest, InvoiceUpdateRequest, InvoiceSearchRequest } from "src/app/modules/invoices/invoices.module";
import Axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  public SelectedData: InvoiceResponse | null = null;
  public Dialog: any | null = null;
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }
  async Add(data: InvoiceRequest) {
    const apiUrl = `/api/invoice`;

    return await this.httpClient.post(apiUrl, data);
  }

  async Update(data: InvoiceUpdateRequest) {

    const apiUrl = `/api/invoice`;
    return await this.httpClient.put(apiUrl, data);
  }

  async Delete(uuid: string) {

    const apiUrl = `/api/invoice/${uuid}`;
    return await this.httpClient.delete(apiUrl, uuid)

  }

  async Search(filter: InvoiceSearchRequest) {

    const apiUrl = `/api/invoice/list?${this.layoutService.Filter(filter)}`;

    return await this.httpClient.get(apiUrl)

  }

}
