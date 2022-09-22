import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { AdminService } from '../../../services/admin.service';
import { MessagesService } from '../../../services/utils/messages.service';
import { NgForm } from '@angular/forms';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-inventory-product',
  templateUrl: './inventory-product.component.html',
  styleUrls: ['./inventory-product.component.css'],
})
export class InventoryProductComponent implements OnInit {
  id: string = '';
  idUser: string = '';
  token: string = '';
  product: any = {};
  inventoryProduct: any[] = [];
  arrInventoryProduct: any[] = [];
  loadData = false;
  inventory: any = {};

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private adminService: AdminService,
    private messagesService: MessagesService
  ) {
    this.token = this.adminService.getToken() || '';
    this.idUser = localStorage.getItem('_id') || '';
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
    } else {
      this.messagesService.errorMessageAlert('no se pudo obtener el producto');
      this.product = undefined;
    }
  }

  async deleteInventoryProduct(id: string) {
    this.loadData = true;
    const resp = await this.productService.deleteInventoryProduct(
      id,
      this.token
    );
    this.loadData = false;
    if (resp.ok) {
      this.closeConfirmModal(id);
      this.product = resp.data;
      this.getInventoryProduct();
    } else {
      this.messagesService.errorMessageAlert(
        'no se pudo eliminar el inventario del producto'
      );
      this.inventoryProduct = [];
    }
  }

  async getInventoryProduct() {
    this.loadData = true;
    const resp = await this.productService.listInventoryProduct(
      this.id,
      this.token
    );
    this.loadData = false;
    if (resp.ok) {
      console.log(resp);
      this.inventoryProduct = resp.data;
      this.inventoryProduct.forEach((i: any) => {
        this.arrInventoryProduct.push({
          admin: i.admin.names + ' ' + i.admin.lastNames,
          quantity: i.quantity,
          supplier: i.supplier,
        });
      });
    } else {
      this.messagesService.errorMessageAlert(
        'no se pudo otener el inventario del producto'
      );
      this.inventoryProduct = [];
    }
  }

  async registerInventory(inventoryForm: NgForm) {
    if (inventoryForm.valid) {
      let data = {
        product: this.product._id,
        quantity: inventoryForm.value.quantity,
        supplier: inventoryForm.value.supplier,
      };

      let resp = await this.productService.registerInventoryProduct(
        data,
        this.token
      );

      if (resp.ok) {
        this.messagesService.successMessageAlert(
          'se agregó con éxito el nuevo stock al producto'
        );
        this.getInventoryProduct();
      } else {
        console.log(resp.message);
        this.messagesService.errorMessageAlert(
          'no se pudo crear el inventario: '
        );
      }
    } else {
      this.messagesService.errorMessageAlert(
        'debe completar todos los registros del formulario'
      );
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
    for (let x1 of this.arrInventoryProduct) {
      let x2 = Object.keys(x1);

      let temp = [];
      for (let y of x2) {
        temp.push(x1[y]);
      }
      worksheet.addRow(temp);
    }

    let fname = 'REP01- ';

    worksheet.columns = [
      { header: 'Trabajador', key: 'col1', width: 30 },
      { header: 'Cantidad', key: 'col2', width: 15 },
      { header: 'Proveedor', key: 'col3', width: 25 },
    ] as any;

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xlsx');
    });
  }
}
