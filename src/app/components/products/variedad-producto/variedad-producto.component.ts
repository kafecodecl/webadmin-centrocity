import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from '../../../services/utils/messages.service';
import { AdminService } from '../../../services/admin.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-variedad-producto',
  templateUrl: './variedad-producto.component.html',
  styleUrls: ['./variedad-producto.component.css'],
})
export class VariedadProductoComponent implements OnInit {
  product: any = {
    varieties: [],
  };
  varietyTitle: string = '';
  newVariety: string = '';
  id: string = '';
  loadData: boolean = false;
  token: string = '';
  urlBaseImg: string = '';

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
    } else {
      this.messagesService.errorMessageAlert('no se pudo obtener el producto');
      this.product = undefined;
    }
  }

  addVariety() {
    if (this.newVariety) {
      this.product.varieties.push({
        title: this.newVariety,
      });
      this.newVariety = '';
    } else {
      this.messagesService.errorMessageAlert(
        'El campo variedad es obligatorio'
      );
    }
  }

  async updateVariety() {
    if (this.product.titleVariety) {
      if (this.product.varieties.length > 0) {
        this.loadData = true;
        const resp = await this.productService.updateProductVarietyAdmin(
          this.id,
          {
            titleVariety: this.product.titleVariety,
            varieties: this.product.varieties,
          },
          this.token
        );
        this.loadData = false;

        if (resp.ok) {
          this.messagesService.successMessageAlert(
            'Se han añadido las variedades con éxito'
          );
          this.router.navigate(['/panel/products']);
        } else {
          this.messagesService.errorMessageAlert(
            'no se agregaron las variedades'
          );
        }
        console.log(resp);
      } else {
        this.messagesService.errorMessageAlert(
          'debe agregar al menos una variedad a la tabla'
        );
      }
    } else {
      this.messagesService.errorMessageAlert(
        'el título de la variedad es obligatorio'
      );
    }
  }

  deleteVariety(idx: any) {
    this.product.varieties.splice(idx, 1);
  }
}
