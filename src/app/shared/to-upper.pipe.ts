import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toUpper'
})
export class ToUpperPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value !== 'string') {
      return value;
    }
    return (value as string)?.toUpperCase();
  }

}
