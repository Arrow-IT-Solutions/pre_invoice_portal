import { Injectable } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import Axios from 'axios';
import { environment } from 'src/environments/environment';
import { HttpClientService } from 'src/app/Core/services/http-client.service';
import { ClientSearchRequest, ClientRequest, ClientUpdateRequest, ClientResponse } from 'src/app/modules/clients/clients.module';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  public SelectedData: ClientResponse | null = null;
  public Dialog: any | null = null;
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }
  async Add(data: ClientRequest) {
    const apiUrl = `/api/client`;

    return await this.httpClient.post(apiUrl, data);
  }

  async Update(data: ClientUpdateRequest) {

    const apiUrl = `/api/client`;
    return await this.httpClient.put(apiUrl, data);
  }

  async Delete(uuid: string) {

    const apiUrl = `/api/client/${uuid}`;
    return await this.httpClient.delete(apiUrl, uuid)

  }

  async Search(filter: ClientSearchRequest) {

    const apiUrl = `/api/client/list?${this.layoutService.Filter(filter)}`;

    return await this.httpClient.get(apiUrl)

  }


}
