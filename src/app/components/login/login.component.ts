import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { MessagesService } from '../../services/utils/messages.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: any = {
    email: '',
    password: '',
  };
  token: any = '';

  constructor(
    private adminService: AdminService,
    private router: Router,
    private messagesService: MessagesService
  ) {
    this.token = this.adminService.getToken();
  }

  ngOnInit(): void {
    if (this.token) {
      this.router.navigate(['/']);
    }
  }

  async login(loginForm: any) {
    var data = {
      email: this.user.email,
      password: this.user.password,
    };

    if (loginForm.valid) {
      let resp = await this.adminService.login(data);
      if (!resp.data) {
        this.messagesService.errorMessageAlert(resp.message);
        return;
      }

      // petición correcta
      localStorage.setItem('token', resp.token);
      localStorage.setItem('_id', resp.data._id);
      localStorage.setItem(
        'nombre',
        resp.data.nombres + ' ' + resp.data.apellidos
      );
      this.router.navigate(['/departamentos/index']);
    } else {
      this.messagesService.errorMessageAlert(
        'Debe ingresar su usuario y contraseña'
      );
    }
  }
}
