import { Component, OnInit } from '@angular/core';
import * as fs from 'file-saver';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-index-departamentos',
  templateUrl: './index-departamentos.component.html',
  styleUrls: ['./index-departamentos.component.css'],
})
export class IndexDepartamentosComponent implements OnInit {
  loadData = false;
  filterTitle = 'Filtrar Departamentos';
  departamentos: any[] = [];

  page = 1;
  pageSize = 10;
  urlBaseImg = '';

  constructor() {}

  ngOnInit(): void {
    this.departamentos = [
      {
        _id: '632b7c13981c357f97e8fdd8',
        nombre: 'Departamento con terraza',
        nHabitaciones: 1,
        imgPortada: 'assets/upload/departamentos/depto_estudio_2/foto6.jpg',
        tamanio: 50,
        personas: 3,
        disponible: true,
        valor: 56000,
        detalles: [
          {
            icono: 'fa-solid fa-restroom',
            descripcion: 'Un Baño',
          },
          {
            icono: 'fa-solid fa-tv',
            descripcion: 'SmartTv en la sala y dormitorio',
          },
          {
            icono: 'fa-duotone fa-bed-front',
            descripcion: 'Cama nido en la sala',
          },
          {
            icono: 'fa-solid fa-couch',
            descripcion: 'Sofa cama',
          },
          {
            icono: 'fa-solid fa-wifi',
            descripcion: 'Internet',
          },
          {
            icono: 'fa-solid fa-tv',
            descripcion: 'Cable',
          },
          {
            icono: 'fa-solid fa-people-group',
            descripcion: 'Para 3 personas',
          },
        ],
        galeria: [
          {
            img: 'assets/upload/departamentos/depto_estudio_2/foto1.jpg',
          },
          {
            img: 'assets/upload/departamentos/depto_estudio_2/foto2.jpg',
          },
          {
            img: 'assets/upload/departamentos/depto_estudio_2/foto3.jpg',
          },
          {
            img: 'assets/upload/departamentos/depto_estudio_2/foto4.jpg',
          },
          {
            img: 'assets/upload/departamentos/depto_estudio_2/foto5.jpg',
          },
          {
            img: 'assets/upload/departamentos/depto_estudio_2/foto6.jpg',
          },
          {
            img: 'assets/upload/departamentos/depto_estudio_2/foto7.jpg',
          },
          {
            img: 'assets/upload/departamentos/depto_estudio_2/foto8.jpg',
          },
        ],
        comentarios: 'Departamento acogedor en pleno centro de Santiago',
        valoraciones: 0,
        __v: 0,
      },
      {
        _id: '632b7cf3981c357f97e8fddb',
        nombre: 'Departamento estudio',
        nHabitaciones: 1,
        imgPortada: 'assets/upload/departamentos/depto_estudio_1/foto9.jpg',
        tamanio: 50,
        personas: 3,
        disponible: true,
        valor: 60000,
        detalles: [
          {
            icono: 'fa-solid fa-utensils',
            descripcion: 'Comedor',
          },
          {
            icono: 'fa-solid fa-tv',
            descripcion: 'SmartTv en dormitorio y comedor',
          },
          {
            icono: 'fa-solid fa-restroom',
            descripcion: 'Baño',
          },
          {
            icono: 'fa-duotone fa-bed-front',
            descripcion: 'Cama nido en la sala ',
          },
          {
            icono: 'fa-solid fa-wifi',
            descripcion: 'Internet',
          },
          {
            icono: 'fa-solid fa-tv',
            descripcion: 'Cable',
          },
          {
            icono: 'fa-solid fa-people-group',
            descripcion: 'Para 3 personas',
          },
        ],
        galeria: [
          {
            img: 'assets/upload/departamentos/depto_estudio_1/foto1.jpg',
          },
          {
            img: 'assets/upload/departamentos/depto_estudio_1/foto2.jpg',
          },
          {
            img: 'assets/upload/departamentos/depto_estudio_1/foto3.jpg',
          },
          {
            img: 'assets/upload/departamentos/depto_estudio_1/foto4.jpg',
          },
          {
            img: 'assets/upload/departamentos/depto_estudio_1/foto5.jpg',
          },
          {
            img: 'assets/upload/departamentos/depto_estudio_1/foto6.jpg',
          },
          {
            img: 'assets/upload/departamentos/depto_estudio_1/foto7.jpg',
          },
          {
            img: 'assets/upload/departamentos/depto_estudio_1/foto8.jpg',
          },
          {
            img: 'assets/upload/departamentos/depto_estudio_1/foto9.jpg',
          },
          {
            img: 'assets/upload/departamentos/depto_estudio_1/foto10.jpg',
          },
          {
            img: 'assets/upload/departamentos/depto_estudio_1/foto11.jpg',
          },
        ],
        comentarios: 'Departamento acogedor en pleno centro de Santiago',
        valoraciones: 0,
        __v: 0,
      },
    ];
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
    // const resp = await this.productService.deleteProductAdmin(id, this.token);
    // if (resp.ok) {
    //   this.messageServices.successMessageAlert(
    //     'el registro ha sido eliminado con éxito'
    //   );
    //   this.closeConfirmModal(id);
    //   this.getProductsAdmin();
    // }
  }
}
