import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  apiUrl: string = environment.urlApi;

  constructor(private httpClient: HttpClient) {}

  async listCouponAdmin(filter: any, token: string) {
    const url = this.apiUrl + `list_coupon_admin/${filter}`;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });

    const resp = await this.httpClient.get<any>(url, {
      headers: headers,
    });
    return resp.toPromise();
  }

  async createCouponAdmin(data: any, token: string) {
    const url = this.apiUrl + `create_coupon_admin`;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });

    const resp = await this.httpClient.post<any>(url, data, {
      headers: headers,
    });
    return resp.toPromise();
  }

  async getCouponById(id: any, token: string) {
    const url = this.apiUrl + `get_coupon_by_id_admin/${id}`;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });

    const resp = await this.httpClient.get<any>(url, {
      headers: headers,
    });
    return resp.toPromise();
  }

  async updateCouponAdmin(id: string, data: any, token: string) {
    const url = this.apiUrl + `update_coupon_admin/${id}`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    const resp = await this.httpClient.put<any>(url, data, {
      headers: headers,
    });
    return resp.toPromise();
  }

  async deleteCouponAdmin(id: string, token: string) {
    const url = this.apiUrl + `delete_coupon_admin/${id}`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    const resp = await this.httpClient.delete<any>(url, {
      headers: headers,
    });
    return resp.toPromise();
  }
}
