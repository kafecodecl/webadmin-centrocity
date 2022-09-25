import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from 'src/app/services/utils/messages.service';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';
import { DepartamentoService } from '../../../services/departamento.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-galeria-departamento',
  templateUrl: './galeria-departamento.component.html',
  styleUrls: ['./galeria-departamento.component.css'],
})
export class GaleriaDepartamentoComponent implements OnInit {
  departamento: any = {
    galeria: [],
  };
  // Title: string = '';
  fileImg: any = undefined;
  idDepartamento: string = '';
  loadData: boolean = false;
  token: any = '';
  urlBaseImg: string = '';
  imgFilesAllow: string[] = [
    'image/png',
    'image/webp',
    'image/jpg',
    'image/jpeg',
    'image/gif',
  ];

  constructor(
    private departamentoService: DepartamentoService,
    private route: ActivatedRoute,
    private router: Router,
    private messagesService: MessagesService
  ) {
    this.token = localStorage.getItem('token');
    this.urlBaseImg =
      environment.urlApi + '/api/departamento/get_image_portada/';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idDepartamento = params['id'];
    });
    this.getDepartamentoPorId();
  }

  async getDepartamentoPorId() {
    this.loadData = true;
    const resp = await this.departamentoService.obtenerDepartamentoPorId(
      this.idDepartamento
    );
    this.loadData = false;

    if (resp.ok) {
      this.departamento = resp.data;
    }
  }

  fileChangeEvent(event: any): void {
    let file;

    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0];
      if (file.size <= 4000000000) {
        if (this.imgFilesAllow.includes(file.type)) {
          const reader = new FileReader();
          // reader.onload = (e) => (this.imgSelected = reader.result);
          reader.readAsDataURL(file);

          // $('#nameImage').text(file.name);

          this.fileImg = file;
        } else {
          this.messagesService.errorMessageAlert(
            'debe agregar una imagen válida'
          );
          // this.imgSelected = 'assets/img/01.jpg';
          this.fileImg = undefined;
          $('#inputImg').val('');
          return;
        }
      } else {
        this.messagesService.errorMessageAlert(
          'la imagen supera el tamaño máximo permitido de 4mb'
        );
        // this.imgSelected = 'assets/img/01.jpg';
        this.fileImg = undefined;
        $('#inputImg').val('');
        return;
      }
    } else {
      this.messagesService.errorMessageAlert('No hay una imagen para subir');
      // this.imgSelected = 'assets/img/01.jpg';
      this.fileImg = undefined;
      $('#inputImg').val('');
      return;
    }
  }

  async uploadNewImage() {
    if (this.fileImg != undefined) {
      let data = {
        image: this.fileImg,
        _id: uuidv4(),
      };

      this.loadData = true;
      let resp = await this.departamentoService.actualizarGaleriaDepartamento(
        this.idDepartamento,
        data,
        this.token
      );
      this.loadData = false;

      if (resp.ok) {
        this.getDepartamentoPorId();
        $('#inputImg').val('');
      } else {
        this.messagesService.errorMessageAlert('Error al subir imagen');
      }
    } else {
      this.messagesService.errorMessageAlert(
        'Debe seleccionar una imagen para subir'
      );
    }
  }

  async deleteImage(id: string) {
    this.loadData = true;
    const resp = await this.departamentoService.eliminarGaleriaDepartamento(
      this.idDepartamento,
      { _id: id },
      this.token
    );
    this.loadData = false;

    if (resp.ok) {
      this.messagesService.successMessageAlert(
        'La imagen ha sido eliminado con éxito'
      );
      this.getDepartamentoPorId();
      setTimeout(() => {
        this.closeConfirmModal(id);
      }, 500);
    }
  }

  closeConfirmModal(id: string) {
    $('#delete-' + id).modal('hide');
    $('.modal-backdrop').removeClass('show');
  }
}
