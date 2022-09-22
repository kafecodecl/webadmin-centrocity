import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../../services/clients.service';
import { AdminService } from '../../../services/admin.service';
import { MessagesService } from '../../../services/utils/messages.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-index-client',
  templateUrl: './index-client.component.html',
  styleUrls: ['./index-client.component.css'],
})
export class IndexClientComponent implements OnInit {
  listClient: any = {};
  clients: any[] = [];
  filterLastName = '';
  filterEmail = '';
  page = 1;
  pageSize = 10;
  loadData = true;
  token;

  constructor(
    private clientService: ClientsService,
    private adminService: AdminService,
    private messagesService: MessagesService
  ) {
    this.token = this.adminService.getToken() || '';
  }

  ngOnInit(): void {
    this.getListClient(null, null);
  }

  async getListClient(type: any, filter: any) {
    this.listClient = await this.clientService.listClientsForAdmin(
      type,
      filter,
      this.token
    );
    this.loadData = false;
    // setTimeout(() => {
    //   this.loadData = false;
    // }, 3000);

    this.clients = this.listClient.data;
  }

  async delete(id: string) {
    const resp = await this.clientService.deleteClientAdmin(id, this.token);

    if (resp.ok) {
      this.messagesService.successMessageAlert(
        'el registro ha sido eliminado con éxito'
      );

      this.closeConfirmModal(id);
      this.getListClient(null, null);
    } else {
      this.messagesService.errorMessageAlert('nos e pudo eliminar el registro');
    }
  }

  filter(typeSearch: any) {
    this.loadData = true;
    if (typeSearch === 'lastNames') {
      if (this.filterLastName) {
        this.getListClient(typeSearch, this.filterLastName);
      } else {
        this.getListClient(null, null);
      }
    } else if (typeSearch === 'email') {
      if (this.filterEmail) {
        this.getListClient(typeSearch, this.filterEmail);
      } else {
        this.getListClient(null, null);
      }
    }
  }

  closeConfirmModal(id: string) {
    $('#delete-' + id).modal('hide');
    $('.modal-backdrop').removeClass('show');
  }
}
