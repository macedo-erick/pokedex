import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatId',
})
export class FormatIdPipe implements PipeTransform {
  transform(value?: string): unknown {
    return `#${value?.toString().padStart(4, '0')}`;
  }
}
