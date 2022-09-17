import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatValue'
})
export class FormatValuePipe implements PipeTransform {

  transform(value: number): number {
    if(value >= 100) {
      return value / 10;
    }
    return value / 2;
  }

}
