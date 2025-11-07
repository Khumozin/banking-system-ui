import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'type'
})
export class TypePipe implements PipeTransform {

transform(value: 'DEPOSIT' | 'TRANSFER'): string {
    switch (value) {
      case 'DEPOSIT':
        return 'lucideArrowUpRight';
      case 'TRANSFER':
        return 'lucideArrowLeftRight';
      default:
        return 'lucideCircleHelp'; // Default icon if not recognized
    }
  }

}
