import { Injectable } from "@angular/core";
import { LayoutService } from 'src/app/layout/service/layout.service';
import { HttpClientService } from "src/app/Core/services/http-client.service";
import { ProductResponse, ProductRequest, ProductSearchRequest, ProductUpdateRequest } from "src/app/modules/products/products.module";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public SelectedData: ProductResponse | null = null;
  public Dialog: any | null = null;
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }
  async Add(data: ProductRequest) {
    const apiUrl = `/api/product`;

    return await this.httpClient.post(apiUrl, data);
  }

  async Update(data: ProductUpdateRequest) {

    const apiUrl = `/api/product`;
    return await this.httpClient.put(apiUrl, data);
  }

  async Delete(uuid: string) {

    const apiUrl = `/api/product/${uuid}`;
    return await this.httpClient.delete(apiUrl, uuid)

  }

  async Search(filter: ProductSearchRequest) {

    const apiUrl = `/api/product/list?${this.layoutService.Filter(filter)}`;

    return await this.httpClient.get(apiUrl)

  }
}
