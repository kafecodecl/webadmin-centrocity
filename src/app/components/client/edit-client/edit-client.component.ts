import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../../../services/clients.service';
import { AdminService } from '../../../services/admin.service';
import { MessagesService } from '../../../services/utils/messages.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css'],
})
export class EditClientComponent implements OnInit {
  client: any = {};
  id: string = '';
  token: string = '';
  loadData = false;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientsService,
    private adminService: AdminService,
    private router: Router,
    private messagesService: MessagesService
  ) {
    this.token = this.adminService.getToken() || '';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getClientById(this.id);
    });
  }

  async getClientById(id: string) {
    this.loadData = true;
    const resp = await this.clientService.getClientById(id, this.token);
    this.loadData = false;
    if (resp.ok) {
      this.client = resp.data;
    } else {
      this.client = undefined;
    }
  }

  async update(updateForm: any) {
    this.loadData = true;
    if (updateForm.valid) {
      let resp = await this.clientService.updateClientAdmin(
        this.id,
        this.client,
        this.token
      );

      this.loadData = false;

      if (resp.ok) {
        this.messagesService.successMessageAlert(
          'el registro ha sido actualizado con éxito'
        );

        this.router.navigate(['/panel/clients']);
      } else {
        this.messagesService.errorMessageAlert(
          'ocurrio un error al intentar actualizar el registro'
        );
      }
    } else {
      this.messagesService.errorMessageAlert(
        'debe completar todos los datos del formulario formulario'
      );
    }
  }
}
