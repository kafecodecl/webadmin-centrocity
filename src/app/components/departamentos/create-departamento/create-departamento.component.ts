import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { MessagesService } from '../../../services/utils/messages.service';
import { DepartamentoService } from '../../../services/departamento.service';
import { Router } from '@angular/router';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-create-departamento',
  templateUrl: './create-departamento.component.html',
  styleUrls: ['./create-departamento.component.css'],
})
export class CreateDepartamentoComponent implements OnInit {
  token: any;
  loadData: boolean = false;
  departamento: any = {
    detalles: [],
  };
  detallesArr: any[] = [];
  fileImg: any = undefined;
  imgSelected: any | ArrayBuffer = 'assets/img/01.jpg';

  imgFilesAllow: string[] = [
    'image/png',
    'image/webp',
    'image/jpg',
    'image/jpeg',
    'image/gif',
  ];

  descripcion = '';
  icono = '';

  constructor(
    private messagesService: MessagesService,
    private departamentoService: DepartamentoService,
    private router: Router
  ) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {}

  async register(createForm: NgForm) {
    if (!createForm.valid) {
      this.messagesService.errorMessageAlert(
        'debe completar todos los datos del formulario'
      );
      return;
    }

    if (this.fileImg === undefined) {
      this.messagesService.errorMessageAlert(
        'debe seleccionar una imagen de protada para el producto'
      );
      return;
    }

    this.departamento.disponible = true;

    this.departamento.detalles = this.detallesArr.map((item: any) => {
      return {
        icono: item.icono,
        descripcion: item.descripcion,
      };
    });

    this.loadData = true;
    const resp = await this.departamentoService.crearDepartamento(
      this.departamento,
      this.fileImg,
      this.token
    );
    this.loadData = false;

    if (!resp.ok) {
      this.messagesService.errorMessageAlert(resp.message);
      return;
    }

    this.messagesService.successMessageAlert(
      'El registro ha sido editado con ??xito'
    );
    this.router.navigate(['/departamentos/index']);
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
            'debe agregar una imagen v??lida'
          );
          this.imgSelected = 'assets/img/01.jpg';
          this.fileImg = undefined;
          $('#nameImage').text('Seleccionar imagen');
          return;
        }
      } else {
        this.messagesService.errorMessageAlert(
          'la imagen supera el tama??o m??ximo permitido de 4mb'
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
  }

  agregarDetalle() {
    if (this.descripcion) {
      this.detallesArr.push({
        descripcion: this.descripcion,
        icono: this.icono,
        _id: uuidv4(),
      });
      this.descripcion = '';
      this.icono = '';
    } else {
      // this.messagesService.errorMessageAlert(
      //   'Debe agregar un titulo y un icono a la categor??a que desea agregar'
      // );
    }
  }

  eliminarDetalle(idx: any) {
    this.detallesArr.splice(idx, 1);
  }
}
