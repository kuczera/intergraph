import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trunc'
})
export class TruncPipe implements PipeTransform {

  transform(value: any, len: number): string {
    value = value.toString();

    if (value.length > 20) {
      value = value.substr(0,17) + '...';
    }
    return value.substr(0, len);
  }

}
