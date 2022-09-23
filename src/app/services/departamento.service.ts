import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartamentoService {
  apiUrl: string = environment.urlApi;

  constructor(private httpClient: HttpClient) {}

  async obtenerDepartamentos(filter?: any) {
    try {
      const url =
        this.apiUrl + `/api/departamento/obtener_departamentos/${filter}`;
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      const resp = this.httpClient.get<any>(url, { headers: headers });
      return await lastValueFrom(resp);
    } catch (error) {
      return error;
    }
  }

  async obtenerDepartamentoPorId(id: any) {
    try {
      const url = this.apiUrl + `/api/departamento/obtener_departamento/${id}`;
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      const resp = this.httpClient.get<any>(url, { headers: headers });
      return await lastValueFrom(resp);
    } catch (error) {
      return error;
    }
  }

  async actualizarDepartamento(id: string, body: any, token: string) {
    try {
      const url = this.apiUrl + `/api/departamento/update_departamento/${id}`;
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      });

      const resp = this.httpClient.put<any>(url, body, { headers: headers });
      return await lastValueFrom(resp);
    } catch (error) {
      return error;
    }
  }

  async crearDepartamento(body: any, file: File, token: string) {
    try {
      const url = this.apiUrl + `/api/departamento/create_departamento`;
      let headers = new HttpHeaders({
        Authorization: token,
      });

      console.log('File IMG: ', file);

      const fd = new FormData();
      fd.append('nombre', body.nombre);
      fd.append('nHabitaciones', body.nHabitaciones);
      fd.append('tamanio', body.tamanio);
      fd.append('personas', body.personas);
      fd.append('disponible', body.disponible);
      fd.append('comentarios', body.comentarios);
      fd.append('valor', body.valor);
      fd.append('detalles', JSON.stringify(body.detalles));
      fd.append('galeria', JSON.stringify(body.galeria));
      fd.append('imgPortada', file);

      const resp = this.httpClient.post<any>(url, fd, { headers: headers });
      return await lastValueFrom(resp);
    } catch (error) {
      return error;
    }
  }

  async eliminarDepartamento(id: string, token: string) {
    try {
      const url = this.apiUrl + `/api/departamento/delete_departamento/${id}`;
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      });

      const resp = this.httpClient.delete<any>(url, { headers: headers });
      return await lastValueFrom(resp);
    } catch (error) {
      return error;
    }
  }
}
