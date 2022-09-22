import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ProductService } from 'src/app/services/product.service';
import { MessagesService } from 'src/app/services/utils/messages.service';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-galery-products',
  templateUrl: './galery-products.component.html',
  styleUrls: ['./galery-products.component.css'],
})
export class GaleryProductsComponent implements OnInit {
  product: any = {
    varieties: [],
    galery: [],
  };
  // Title: string = '';
  fileImg: any = undefined;
  id: string = '';
  loadData: boolean = false;
  token: string = '';
  urlBaseImg: string = '';
  imgFilesAllow: string[] = [
    'image/png',
    'image/webp',
    'image/jpg',
    'image/jpeg',
    'image/gif',
  ];

  constructor(
    private productService: ProductService,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private messagesService: MessagesService
  ) {
    this.token = this.adminService.getToken() || '';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.getProductByIdAdmin(this.id);
    this.urlBaseImg = environment.urlApi + 'get_image_cover/';
  }

  async getProductByIdAdmin(id: string) {
    this.loadData = true;
    const resp = await this.productService.getProductsByIdAdmin(id, this.token);
    this.loadData = false;

    if (resp.ok) {
      this.product = resp.data;
      console.log(this.product);
    } else {
      this.messagesService.errorMessageAlert('no se pudo obtener el producto');
      this.product = undefined;
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

    console.log(this.fileImg);
  }

  async uploadNewImage() {
    if (this.fileImg != undefined) {
      let data = {
        image: this.fileImg,
        _id: uuidv4(),
      };

      this.loadData = true;
      let resp = await this.productService.updateProductGaleryAdmin(
        this.id,
        data,
        this.token
      );
      this.loadData = false;

      if (resp.ok) {
        this.getProductByIdAdmin(this.id);
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
    const resp = await this.productService.deleteProductGaleryAdmin(
      this.id,
      { _id: id },
      this.token
    );
    this.loadData = false;

    if (resp.ok) {
      this.messagesService.successMessageAlert(
        'el registro ha sido eliminado con éxito'
      );

      this.closeConfirmModal(id);
      this.getProductByIdAdmin(this.id);
    }
  }

  closeConfirmModal(id: string) {
    $('#delete-' + id).modal('hide');
    $('.modal-backdrop').removeClass('show');
  }
}
