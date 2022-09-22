import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl: string = environment.urlApi;

  constructor(private httpClient: HttpClient) {}

  async createProductAdmin(data: any, file: File, token: string) {
    const url = this.apiUrl + `create_pruduct_admin`;
    let headers = new HttpHeaders({
      Authorization: token,
    });

    const fd = new FormData();
    fd.append('title', data.title);
    fd.append('stock', data.stock);
    fd.append('price', data.price);
    fd.append('description', data.description);
    fd.append('content', data.content);
    fd.append('category', data.category);
    fd.append('cover', file);

    const resp = await this.httpClient.post<any>(url, fd, {
      headers: headers,
    });
    return resp.toPromise();
  }

  async updateProductAdmin(id: string, data: any, token: string) {
    const url = this.apiUrl + `update_product_admin/${id}`;
    let headers = new HttpHeaders({
      Authorization: token,
    });

    if (!data.cover) {
      const resp = await this.httpClient.put<any>(url, data, {
        headers: headers,
      });
      return resp.toPromise();
    }

    const fd = new FormData();
    fd.append('title', data.title);
    fd.append('stock', data.stock);
    fd.append('price', data.price);
    fd.append('description', data.description);
    fd.append('content', data.content);
    fd.append('category', data.category);
    fd.append('cover', data.cover);

    const resp = await this.httpClient.put<any>(url, fd, {
      headers: headers,
    });
    return resp.toPromise();
  }

  async updateProductVarietyAdmin(id: string, data: any, token: string) {
    const url = this.apiUrl + `update_product_variety_admin/${id}`;
    let headers = new HttpHeaders({
      Authorization: token,
    });

    if (!data.cover) {
      const resp = await this.httpClient.put<any>(url, data, {
        headers: headers,
      });
      return resp.toPromise();
    }

    const resp = await this.httpClient.put<any>(url, data, {
      headers: headers,
    });
    return resp.toPromise();
  }

  async deleteProductGaleryAdmin(id: string, data: any, token: string) {
    const url = this.apiUrl + `delete_product_galery_admin/${id}`;
    let headers = new HttpHeaders({
      Authorization: token,
    });

    if (!data.cover) {
      const resp = await this.httpClient.put<any>(url, data, {
        headers: headers,
      });
      return resp.toPromise();
    }

    const resp = await this.httpClient.put<any>(url, data, {
      headers: headers,
    });
    return resp.toPromise();
  }

  async updateProductGaleryAdmin(id: any, data: any, token: string) {
    const url = this.apiUrl + `update_product_galery_admin/${id}`;
    let headers = new HttpHeaders({
      Authorization: token,
    });

    const fd = new FormData();
    fd.append('_id', data._id);
    fd.append('image', data.image);

    const resp = await this.httpClient.put<any>(url, fd, {
      headers: headers,
    });
    return resp.toPromise();
  }

  async getProductsAdmin(filter: any, token: string) {
    const url = this.apiUrl + `get_products_admin/${filter}`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });

    const resp = await this.httpClient.get<any>(url, { headers: headers });
    return resp.toPromise();
  }

  async getProductsByIdAdmin(id: string, token: string) {
    const url = this.apiUrl + `get_product_by_id/${id}`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });

    const resp = await this.httpClient.get<any>(url, { headers: headers });
    return resp.toPromise();
  }

  async getImageCover(imgName: string) {
    const url = this.apiUrl + `get_image_cover/${imgName}`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const resp = await this.httpClient.get<any>(url, { headers: headers });
    return resp.toPromise();
  }

  async deleteProductAdmin(id: string, token: string) {
    const url = this.apiUrl + `delete_product_admin/${id}`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    const resp = await this.httpClient.delete<any>(url, {
      headers: headers,
    });
    return resp.toPromise();
  }

  async listInventoryProduct(id: string, token: string) {
    const url = this.apiUrl + `list_inventory_product/${id}`;
    console.log('IDDD:: ', id);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    const resp = await this.httpClient.get<any>(url, {
      headers: headers,
    });
    return resp.toPromise();
  }

  async deleteInventoryProduct(id: string, token: string) {
    const url = this.apiUrl + `delete_inventory_product/${id}`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    const resp = await this.httpClient.delete<any>(url, {
      headers: headers,
    });
    return resp.toPromise();
  }

  async registerInventoryProduct(data: any, token: string) {
    const url = this.apiUrl + `register_inventory_product`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    const resp = await this.httpClient.post<any>(url, data, {
      headers: headers,
    });
    return resp.toPromise();
  }
}
