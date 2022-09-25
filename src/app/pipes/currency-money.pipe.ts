import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'currencyMoney',
})
export class CurrencyMoneyPipe implements PipeTransform {
  transform(value: any) {
    const formatterPeso = new Intl.NumberFormat(environment.numberFormat, {
      style: 'currency',
      currency: environment.currency,
      minimumFractionDigits: 0,
    });
    return formatterPeso.format(value);
  }
}
