import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmFieldImports } from '@spartan-ng/helm/field';

@Component({
  selector: 'app-account-transaction-history',
  imports: [HlmFieldImports],
  template: `
    <fieldset hlmFieldSet class="gap-3">
      <legend hlmFieldLegend>Transaction History</legend>
      <p hlmFieldDescription>All transactions involving this account</p>
    </fieldset>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AccountTransactionHistory {}
