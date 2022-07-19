import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatText'
})
export class FormatTextPipe implements PipeTransform {

  transform(value?: string): unknown {
    return value?.replace("\n", " ").replace("\f", " ");
  }

}
