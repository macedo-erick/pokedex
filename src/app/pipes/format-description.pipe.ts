import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDescription'
})
export class FormatDescriptionPipe implements PipeTransform {

  transform(value: string): unknown {
    return value?.replace("\n", "").replace("\f", "");
  }

}
