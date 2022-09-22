import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { AdminService } from '../../../services/admin.service';
import { environment } from '../../../../environments/environment';
import { MessagesService } from '../../../services/utils/messages.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-index-products',
  templateUrl: './index-products.component.html',
  styleUrls: ['./index-products.component.css'],
})
export class IndexProductsComponent implements OnInit {
  products: any[] = [];
  arrProducts: any[] = [];
  loadData = true;
  token: string = '';
  filterTitle = '';
  urlBaseImg = '';

  page = 1;
  pageSize = 10;

  constructor(
    private productService: ProductService,
    private adminService: AdminService,
    private messageServices: MessagesService
  ) {
    this.urlBaseImg = environment.urlApi + 'get_image_cover/';
    this.token = this.adminService.getToken() || '';
  }

  ngOnInit(): void {
    this.getProductsAdmin();
  }

  async getProductsAdmin() {
    let resp = await this.productService.getProductsAdmin(
      this.filterTitle,
      this.token
    );
    this.products = resp.data;
    this.products.forEach((p: any) => {
      this.arrProducts.push({
        title: p.title,
        stock: p.stock,
        price: p.price,
        category: p.category,
        nsales: p.nsales,
      });
    });
    console.log('arr: ', this.arrProducts);
    this.loadData = false;
  }

  filter() {
    if (this.filterTitle) {
      this.getProductsAdmin();
    } else {
      this.messageServices.warningMessageAlert(
        'debe ingresar un texto para realizar la búsqueda del producto'
      );
    }
  }

  resetFilter() {
    this.filterTitle = '';
    this.getProductsAdmin();
  }

  async delete(id: string) {
    const resp = await this.productService.deleteProductAdmin(id, this.token);

    if (resp.ok) {
      this.messageServices.successMessageAlert(
        'el registro ha sido eliminado con éxito'
      );

      this.closeConfirmModal(id);
      this.getProductsAdmin();
    }
  }

  closeConfirmModal(id: string) {
    $('#delete-' + id).modal('hide');
    $('.modal-backdrop').removeClass('show');
  }

  downloadExcel() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Reporte de productos');

    worksheet.addRow(undefined);
    for (let x1 of this.arrProducts) {
      let x2 = Object.keys(x1);

      let temp = [];
      for (let y of x2) {
        temp.push(x1[y]);
      }
      worksheet.addRow(temp);
    }

    let fname = 'REP01- ';

    worksheet.columns = [
      { header: 'Producto', key: 'col1', width: 30 },
      { header: 'Stock', key: 'col2', width: 15 },
      { header: 'Precio', key: 'col3', width: 15 },
      { header: 'Categoria', key: 'col4', width: 25 },
      { header: 'N° ventas', key: 'col5', width: 15 },
    ] as any;

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xlsx');
    });
  }
}
