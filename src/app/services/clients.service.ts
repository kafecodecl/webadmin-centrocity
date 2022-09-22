import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  apiUrl: string = environment.urlApi;

  constructor(private httpClient: HttpClient) {}

  async listClientsForAdmin(type: any, filter: any, token: string) {
    const url = this.apiUrl + `list_clients_for_admin/${type}/${filter}`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    const resp = await this.httpClient.get<any>(url, { headers: headers });
    return resp.toPromise();
  }

  async createClientAdmin(data: any, token: string) {
    const url = this.apiUrl + `create_client_admin`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    const resp = await this.httpClient.post<any>(url, data, {
      headers: headers,
    });
    return resp.toPromise();
  }

  async updateClientAdmin(id: string, data: any, token: string) {
    const url = this.apiUrl + `update_client_admin/${id}`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    const resp = await this.httpClient.put<any>(url, data, {
      headers: headers,
    });
    return resp.toPromise();
  }

  async deleteClientAdmin(id: string, token: string) {
    const url = this.apiUrl + `delete_client_admin/${id}`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    const resp = await this.httpClient.delete<any>(url, {
      headers: headers,
    });
    return resp.toPromise();
  }

  async getClientById(id: any, token: string) {
    const url = this.apiUrl + `get_clients_for_admin/${id}`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    const resp = await this.httpClient.get<any>(url, { headers: headers });
    return resp.toPromise();
  }
}

// create_client_admin
