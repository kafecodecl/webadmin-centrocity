import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessagesService } from '../../../services/utils/messages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { ProductService } from '../../../services/product.service';
import { environment } from '../../../../environments/environment';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  product: any = {};
  id: string = '';
  configTinymce: any = {};
  config: any = {};
  imgSelected: any | ArrayBuffer;
  loadData = false;
  token: string = '';
  urlApi: string = '';
  imgFilesAllow: string[] = [
    'image/png',
    'image/webp',
    'image/jpg',
    'image/jpeg',
    'image/gif',
  ];
  fileImg: any = undefined;

  constructor(
    private productService: ProductService,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private messagesService: MessagesService
  ) {
    this.configTinymce = {
      height: 500,
    };
    this.token = this.adminService.getToken() || '';
    this.urlApi = environment.urlApi;
    this.getConfigurationsPublic();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getProductByIdAdmin(this.id);
    });
  }

  async getProductByIdAdmin(id: string) {
    this.loadData = true;
    const resp = await this.productService.getProductsByIdAdmin(id, this.token);
    this.loadData = false;
    if (resp.ok) {
      this.product = resp.data;
      this.imgSelected = this.urlApi + 'get_image_cover/' + this.product.cover;
    } else {
      this.messagesService.errorMessageAlert('no se pudo otener el producto');
      this.product = undefined;
    }
  }

  async getConfigurationsPublic() {
    const resp = await this.adminService.getConfigurationsPublic();

    if (resp.ok) {
      this.config = resp.data;
      console.log(this.config);
    }
  }

  async update(updateForm: NgForm) {
    if (!updateForm.valid) {
      this.messagesService.errorMessageAlert(
        'debe completar todos los datos del formulario'
      );
      return;
    }

    this.loadData = true;

    var data: any = {};

    if (this.fileImg !== undefined) {
      data.cover = this.fileImg;
    }

    data.title = this.product.title;
    data.stock = this.product.stock;
    data.price = this.product.price;
    data.category = this.product.category;
    data.description = this.product.description;
    data.content = this.product.content;

    const resp = await this.productService.updateProductAdmin(
      this.id,
      data,
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
    this.router.navigate(['/panel/products']);
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
