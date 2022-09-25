import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  apiUrl: string = environment.urlApi;

  constructor(private httpClient: HttpClient) {}

  async login(data: any) {
    const url = this.apiUrl + '/api/auth/login';
    const resp = await this.httpClient.post<any>(url, data);
    return await lastValueFrom(resp);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticate(alowRoles: string[]): boolean {
    const token = localStorage.getItem('token')!;

    if (!token) {
      localStorage.clear();
      return false;
    }

    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token);

      if (helper.isTokenExpired(token)) {
        localStorage.clear();
        return false;
      }

      if (!decodedToken) {
        localStorage.clear();
        return false;
      }
    } catch (error) {
      localStorage.clear();
      return false;
    }

    return alowRoles.includes(decodedToken['role']);
  }

  async getConfigAdmin(token: string) {
    const url = this.apiUrl + `get_config_admin`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    const resp = await this.httpClient.get<any>(url, { headers: headers });
    return await lastValueFrom(resp);
  }

  async updateConfigAdmin(id: any, data: any, token: string) {
    const url = this.apiUrl + `update_config_admin/${id}`;
    let headers = new HttpHeaders({
      Authorization: token,
    });

    if (!data.brand) {
      const resp = await this.httpClient.put<any>(url, data, {
        headers: headers,
      });
      return await lastValueFrom(resp);
    }

    const fd = new FormData();

    fd.append('title', data.title);
    fd.append('categories', JSON.stringify(data.categories));
    fd.append('serie', data.serie);
    fd.append('correlative', data.correlative);
    fd.append('brand', data.brand);

    const resp = await this.httpClient.put<any>(url, fd, {
      headers: headers,
    });
    return await lastValueFrom(resp);
  }

  async getConfigurationsPublic() {
    const url = this.apiUrl + 'get_configurations_public';
    const resp = await this.httpClient.get<any>(url);
    return await lastValueFrom(resp);
  }

  // get_configurations_public
}
