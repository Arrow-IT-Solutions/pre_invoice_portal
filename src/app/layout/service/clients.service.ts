import { Injectable } from "@angular/core";
import { ClientResponse } from "src/app/modules/clients/clients.module";

@Injectable({
    providedIn: 'root'
  })

  export class ClientsService{
    public SelectedData: ClientResponse | null = null;

  }