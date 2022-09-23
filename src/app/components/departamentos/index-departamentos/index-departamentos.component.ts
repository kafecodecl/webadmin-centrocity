import { Component, OnInit } from '@angular/core';
import * as fs from 'file-saver';
import { DepartamentoService } from '../../../services/departamento.service';
import { MessagesService } from '../../../services/utils/messages.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-index-departamentos',
  templateUrl: './index-departamentos.component.html',
  styleUrls: ['./index-departamentos.component.css'],
})
export class IndexDepartamentosComponent implements OnInit {
  token: any;
  loadData = false;
  filterTitle = 'Filtrar Departamentos';
  departamentos: any[] = [];

  page = 1;
  pageSize = 10;
  urlBaseImg = '';

  constructor(
    private departamentoService: DepartamentoService,
    private messageServices: MessagesService
  ) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this.obtenerDepartamentos();
  }

  async obtenerDepartamentos() {
    this.loadData = true;
    const resp = await this.departamentoService.obtenerDepartamentos();
    this.loadData = false;

    if (resp.ok && resp.data) {
      this.departamentos = resp.data;
    }
  }

  filter() {
    // if (this.filterTitle) {
    //   this.getProductsAdmin();
    // } else {
    //   this.messageServices.warningMessageAlert(
    //     'debe ingresar un texto para realizar la búsqueda del producto'
    //   );
    // }
  }

  resetFilter() {}

  closeConfirmModal(id: string) {
    $('#delete-' + id).modal('hide');
    $('.modal-backdrop').removeClass('show');
  }

  async delete(id: string) {
    this.loadData = true;
    const resp = await this.departamentoService.eliminarDepartamento(
      id,
      this.token
    );
    this.loadData = false;

    if (resp.ok) {
      this.messageServices.successMessageAlert(
        'el registro ha sido eliminado con éxito'
      );
      this.closeConfirmModal(id);
      this.obtenerDepartamentos();
    }
  }
}
