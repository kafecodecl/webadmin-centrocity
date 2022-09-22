import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../../services/clients.service';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { MessagesService } from '../../../services/utils/messages.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css'],
})
export class CreateClientComponent implements OnInit {
  clients: any = {
    gender: '',
  };
  loadData = false;
  token: string = '';

  constructor(
    private clientService: ClientsService,
    private adminService: AdminService,
    private router: Router,
    private messagesService: MessagesService
  ) {
    this.token = adminService.getToken() || '';
  }

  ngOnInit(): void {}

  async register(registerForm: any) {
    this.loadData = true;
    if (registerForm.valid) {
      let resp = await this.clientService.createClientAdmin(
        this.clients,
        this.token
      );

      this.loadData = false;

      if (resp.ok) {
        this.messagesService.successMessageAlert(
          'el registro ha sido agregado con éxito'
        );

        this.clients = {
          names: '',
          lastNames: '',
          email: '',
          telephone: '',
          birthDate: '',
          dni: '',
          gender: '',
        };

        this.router.navigate(['/panel/clients']);
      } else {
        this.messagesService.errorMessageAlert(
          'ocurrio un error al intentar agregar el registro'
        );
      }
    } else {
      this.messagesService.errorMessageAlert(
        'debe completar todos los datos del formulario'
      );
    }
  }
}
