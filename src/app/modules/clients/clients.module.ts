import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients/clients.component';
import { NgPrimeModule } from 'src/app/shared/ngprime.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RequestBase, ResponseBase, SearchRequestBase } from 'src/app/shared/class/class';
import { AddClientComponent } from './add-client/add-client.component';
import { UserResponse, UserTranslationRequest, UserTranslationUpdateRequest } from '../auth/auth.module';


@NgModule({
  declarations: [
    ClientsComponent,
    AddClientComponent,

  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    NgPrimeModule,
    ReactiveFormsModule,
    SharedModule

  ]
})
export class ClientsModule { }
export interface ClientResponse extends ResponseBase {
  uuid: string
  phone?: string,
  clientTranslation?: { [key: string]: ClientTranslationResponse };
}
export interface ClientSearchRequest extends SearchRequestBase {
  uuid?: string
  name?: string
  phone?: string

}

export interface ClientUpdateRequest extends RequestBase {
  uuid?: string
  clientTranslation?: ClientTranslationUpdateRequest[];
  phone?: string


}
export interface ClientRequest extends RequestBase {

  clientTranslation?: ClientTranslationRequest[];
  phone?: string,

}

export interface ClientTranslationResponse {
  uuid?: string;
  firstName?: string;
  lastName?: string;
  language?: string;
}
export interface ClientTranslationRequest {
  uuid?: string;
  firstName?: string;
  lastName?: string;
  language?: string;
}
export interface ClientTranslationUpdateRequest {
  uuid?: string;
  firstName?: string;
  lastName?: string;
  language?: string
}

