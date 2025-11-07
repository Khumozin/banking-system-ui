import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-transactions',
  imports: [],
  template: `
    <p>
      transactions works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Transactions {

}
