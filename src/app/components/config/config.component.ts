import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MessagesService } from '../../services/utils/messages.service';

import { v4 as uuidv4 } from 'uuid';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
})
export class ConfigComponent implements OnInit {
  config: any = {
    categories: [],
  };
  token: string = '';
  loadData = false;
  urlApi: string = '';

  titleCat = '';
  iconCat = '';

  imgSelected: any | ArrayBuffer;
  imgFilesAllow: string[] = [
    'image/png',
    'image/webp',
    'image/jpg',
    'image/jpeg',
    'image/gif',
  ];
  fileImg: any = undefined;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private messagesService: MessagesService
  ) {
    this.token = adminService.getToken() || '';
    this.urlApi = environment.urlApi;
  }

  ngOnInit(): void {
    this.getConfigAdmin();
  }

  async getConfigAdmin() {
    this.loadData = true;
    const resp = await this.adminService.getConfigAdmin(this.token);
    this.loadData = false;
    if (resp.ok) {
      this.config = resp.data;
      this.imgSelected = this.urlApi + 'get_image_brand/' + this.config.brand;
    } else {
      this.config = undefined;
    }
  }

  addCategory() {
    if (this.titleCat && this.iconCat) {
      this.config.categories.push({
        title: this.titleCat,
        icon: this.iconCat,
        _id: uuidv4(),
      });

      this.titleCat = '';
      this.iconCat = '';

      console.log(this.config.categories);
    } else {
      this.messagesService.errorMessageAlert(
        'Debe agregar un titulo y un icono a la categoría que desea agregar'
      );
    }
  }

  deleteCategory(idx: any) {
    this.config.categories.splice(idx, 1);
  }

  async update(configForm: NgForm) {
    console.log(this.config.categories);
    this.loadData = true;
    if (configForm.valid) {
      var data: any = {};
      if (this.fileImg !== undefined) {
        data.brand = this.fileImg;
      }
      data.categories = this.config.categories;
      data.title = configForm.value.title;
      data.serie = configForm.value.serie;
      data.correlative = configForm.value.correlative;

      let resp = await this.adminService.updateConfigAdmin(
        '623d27bec9e99a7e2f61626c',
        data,
        this.token
      );
      if (resp.ok) {
        this.messagesService.successMessageAlert(
          'el registro ha sido actualizado con éxito'
        );
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

  fileChangeEvent(event: any): void {
    let file;

    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0];
      if (file.size <= 4000000000) {
        if (this.imgFilesAllow.includes(file.type)) {
          const reader = new FileReader();
          reader.onload = (e) => (this.imgSelected = reader.result);
          reader.readAsDataURL(file);

          $('#nameImage').text(file.name);

          this.fileImg = file;
        } else {
          this.messagesService.errorMessageAlert(
            'debe agregar una imagen válida'
          );
          this.imgSelected = 'assets/img/01.jpg';
          this.fileImg = undefined;
          $('#nameImage').text('Seleccionar imagen');
          return;
        }
      } else {
        this.messagesService.errorMessageAlert(
          'la imagen supera el tamaño máximo permitido de 4mb'
        );
        this.imgSelected = 'assets/img/01.jpg';
        this.fileImg = undefined;
        $('#nameImage').text('Seleccionar imagen');
        return;
      }
    } else {
      this.messagesService.errorMessageAlert('no hay una imagen para enviar');
      this.imgSelected = 'assets/img/01.jpg';
      this.fileImg = undefined;
      $('#nameImage').text('Seleccionar imagen');
      return;
    }

    console.log(this.fileImg);
  }
}
