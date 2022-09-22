import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-departamento',
  templateUrl: './create-departamento.component.html',
  styleUrls: ['./create-departamento.component.css'],
})
export class CreateDepartamentoComponent implements OnInit {
  loadData: boolean = false;
  departamento: any = {
    detalles: [],
  };
  imgSelected: any | ArrayBuffer = 'assets/img/01.jpg';

  descripcion = '';
  icono = '';

  constructor() {}

  ngOnInit(): void {}

  async register(createForm: NgForm) {
    // if (!createForm.valid) {
    //   this.messagesService.errorMessageAlert(
    //     'debe completar todos los datos del formulario'
    //   );
    //   return;
    // }
    // if (this.fileImg === undefined) {
    //   this.messagesService.errorMessageAlert(
    //     'debe seleccionar una imagen de protada para el producto'
    //   );
    //   return;
    // }
    // this.loadData = true;
    // const resp = await this.productService.createProductAdmin(
    //   this.product,
    //   this.fileImg,
    //   this.token
    // );
    // this.loadData = false;
    // if (!resp.ok) {
    //   this.messagesService.errorMessageAlert(resp.message);
    //   return;
    // }
    // this.messagesService.successMessageAlert(
    //   'El registro ha sido creado con éxito'
    // );
    // this.router.navigate(['/panel/products']);
  }

  fileChangeEvent(event: any): void {
    // let file;
    // if (event.target.files && event.target.files[0]) {
    //   file = <File>event.target.files[0];
    //   if (file.size <= 4000000000) {
    //     if (this.imgFilesAllow.includes(file.type)) {
    //       const reader = new FileReader();
    //       reader.onload = (e) => (this.imgSelected = reader.result);
    //       reader.readAsDataURL(file);
    //       $('#nameImage').text(file.name);
    //       this.fileImg = file;
    //     } else {
    //       this.messagesService.errorMessageAlert(
    //         'debe agregar una imagen válida'
    //       );
    //       this.imgSelected = 'assets/img/01.jpg';
    //       this.fileImg = undefined;
    //       $('#nameImage').text('Seleccionar imagen');
    //       return;
    //     }
    //   } else {
    //     this.messagesService.errorMessageAlert(
    //       'la imagen supera el tamaño máximo permitido de 4mb'
    //     );
    //     this.imgSelected = 'assets/img/01.jpg';
    //     this.fileImg = undefined;
    //     $('#nameImage').text('Seleccionar imagen');
    //     return;
    //   }
    // } else {
    //   this.messagesService.errorMessageAlert('no hay una imagen para enviar');
    //   this.imgSelected = 'assets/img/01.jpg';
    //   this.fileImg = undefined;
    //   $('#nameImage').text('Seleccionar imagen');
    //   return;
    // }
    // console.log(this.fileImg);
  }

  addCategory() {
    if (this.descripcion) {
      this.departamento.detalles.push({
        descripcion: this.descripcion,
        icono: this.icono,
        _id: uuidv4(),
      });
      this.descripcion = '';
      this.icono = '';
      console.log(this.departamento.detalles);
    } else {
      // this.messagesService.errorMessageAlert(
      //   'Debe agregar un titulo y un icono a la categoría que desea agregar'
      // );
    }
  }

  deleteDetalle(idx: any) {
    this.departamento.detalles.splice(idx, 1);
  }
}
