import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-accounts',
  imports: [],
  template: `
    <p>
      accounts works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Accounts {

}
