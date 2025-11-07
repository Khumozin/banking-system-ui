import { Pipe, PipeTransform } from '@angular/core';
import { TransactionStatus } from '../data/transaction.model';

@Pipe({
  name: 'statusIcon',
})
export class StatusIconPipe implements PipeTransform {
  transform(value: TransactionStatus): string {
    switch (value) {
      case 'PENDING':
        return 'lucideCircleDashed';
      case 'FAILED':
        return 'lucideCircleOff';
      case 'COMPLETED':
        return 'lucideCircleCheckBig';
      default:
        return 'lucideCircleHelp'; // Default icon if not recognized
    }
  }
}
