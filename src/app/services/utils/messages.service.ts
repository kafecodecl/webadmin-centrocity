import { Injectable } from '@angular/core';
declare var iziToast: any;

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor() {}

  successMessageAlert(message: string) {
    iziToast.show({
      title: 'Correcto:',
      titleColor: 'green',
      backgroundColor: 'white',
      class: 'text-danger',
      position: 'topRight',
      message: message,
    });
  }

  warningMessageAlert(message: string) {
    iziToast.show({
      title: 'Advertencia:',
      titleColor: '#FFA233',
      backgroundColor: 'white',
      class: 'text-danger',
      position: 'topRight',
      message: message,
    });
  }

  errorMessageAlert(message: string) {
    iziToast.show({
      title: 'Error:',
      titleColor: 'red',
      backgroundColor: 'white',
      class: 'text-danger',
      position: 'topRight',
      message: message,
    });
  }
}
