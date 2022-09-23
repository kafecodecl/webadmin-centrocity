import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from '../../../services/departamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MessagesService } from '../../../services/utils/messages.service';
import { v4 as uuidv4 } from 'uuid';
import { environment } from 'src/environments/environment';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-update-departamento',
  templateUrl: './update-departamento.component.html',
  styleUrls: ['./update-departamento.component.css'],
})
export class UpdateDepartamentoComponent implements OnInit {
  token: any;
  loadData = false;
  idDepartamento: any;
  departamento: any = {};
  detallesArr: any[] = [];
  imgSelected: any | ArrayBuffer = 'assets/img/01.jpg';
  fileImg: any = undefined;
  imgFilesAllow: string[] = [
    'image/png',
    'image/webp',
    'image/jpg',
    'image/jpeg',
    'image/gif',
  ];
  descripcion = '';
  icono = '';
  urlBaseImg = '';

  constructor(
    private departamentoService: DepartamentoService,
    private activateRoute: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router
  ) {
    this.activateRoute.params.subscribe((params: any) => {
      if (params.id) {
        console.log(params.id);

        this.idDepartamento = params.id;
      }
    });

    this.token = localStorage.getItem('token');
    this.urlBaseImg =
      environment.urlApi + '/api/departamento/get_image_portada/';
  }

  ngOnInit(): void {
    this.getDepartamentoPorId();
  }

  async getDepartamentoPorId() {
    this.loadData = true;
    const resp = await this.departamentoService.obtenerDepartamentoPorId(
      this.idDepartamento
    );
    this.loadData = false;

    if (resp.ok === false) {
    } else {
      this.departamento = resp.data;
      this.detallesArr = this.departamento.detalles.map((item: any) => {
        return {
          icono: item.icono,
          descripcion: item.descripcion,
          _id: uuidv4(),
        };
      });
    }
  }

  async actualizar(actualizarForm: NgForm) {
    if (!actualizarForm.valid) {
      this.messagesService.errorMessageAlert(
        'debe completar todos los datos del formulario'
      );
      return;
    }

    if (this.fileImg !== undefined) {
      this.departamento.imgPortada = this.fileImg;
    } else {
      this.messagesService.errorMessageAlert(
        'debe seleccionar una imagen de protada para el producto'
      );
      return;
    }

    this.departamento.detalles = this.detallesArr.map((item: any) => {
      return {
        icono: item.icono,
        descripcion: item.descripcion,
      };
    });

    this.loadData = true;
    const resp = await this.departamentoService.actualizarDepartamento(
      this.idDepartamento,
      this.departamento,
      this.token
    );
    this.loadData = false;

    if (!resp.ok) {
      this.messagesService.errorMessageAlert(resp.message);
      return;
    }

    this.messagesService.successMessageAlert(
      'El registro ha sido editado con éxito'
    );
    this.router.navigate(['/departamentos/index']);
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
      this.messagesService.errorMessageAlert(
        'Debe agregar un titulo par ael detalle'
      );
    }
  }

  eliminarDetalle(idx: any) {
    this.detallesArr.splice(idx, 1);
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
