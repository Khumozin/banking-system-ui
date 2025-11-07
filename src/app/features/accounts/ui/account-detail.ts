import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Dialog } from '../../../shared/ui/dialog/dialog';
import { provideIcons } from '@ng-icons/core';
import { lucideLoaderCircle, lucideUserRound } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { injectBrnDialogContext } from '@spartan-ng/brain/dialog';
import { DialogData } from '../../../shared/ui/dialog/dialog-data.model';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { Account } from '../data/account.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import AccountTransactionHistory from './account-transaction-history';
import NumberFlow from '../../../shared/ui/number-flow';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, map, take, timer } from 'rxjs';

@Component({
  selector: 'app-account-detail',
  imports: [
    HlmSpinnerImports,
    HlmButtonImports,
    HlmFieldImports,
    Dialog,
    CurrencyPipe,
    DatePipe,
    AccountTransactionHistory,
    NumberFlow,
  ],
  providers: [provideIcons({ lucideLoaderCircle, lucideUserRound })],
  template: `
    <app-dialog
      [title]="_dialogContext.title"
      [description]="_dialogContext.description"
      [icon]="_dialogContext.icon"
    >
      <div content hlmFieldGroup class="my-4">
        <fieldset hlmFieldSet class="gap-3">
          <legend hlmFieldLegend>Account Information</legend>

          <div hlmFieldGroup class="grid grid-cols-2">
            <div hlmField class="col-span-1 gap-1">
              <label hlmFieldLabel for="accountId">Account ID</label>
              <p hlmFieldDescription class="font-mono">{{ _dialogContext.data.accountId }}</p>
            </div>
            <div hlmField class="col-span-1 gap-1">
              <label hlmFieldLabel for="ownerName">Owner Name</label>
              <p hlmFieldDescription class="font-bold">{{ _dialogContext.data.ownerName }}</p>
            </div>
          </div>

          <div hlmFieldGroup>
            <div hlmField class="gap-1">
              <label hlmFieldLabel for="createdAt">Created At</label>
              <p hlmFieldDescription>
                {{ _dialogContext.data.createdAt | date: 'yyyy-MM-dd hh:mm:ss' }}
              </p>
            </div>
          </div>

          <div hlmFieldGroup>
            <div hlmField class="gap-1">
              <label hlmFieldLabel for="currentBalance">Current Balance</label>
              <p hlmFieldDescription class="font-mono text-2xl">
                <!-- {{ _dialogContext.data.balance | currency: 'ZAR' : 'symbol-narrow' }} -->

                <app-number-flow
                  [trend]="-1"
                  [value]="balance()"
                  [digits]="digits"
                  [format]="{
                    minimumIntegerDigits: 1,
                    style: 'currency',
                    currency: 'ZAR',
                  }"
                  locales="en-ZA"
                />
              </p>
            </div>
          </div>
        </fieldset>

        <hlm-field-separator />

        <app-account-transaction-history [accountId]="_dialogContext.data.accountId" />
      </div>
    </app-dialog>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AccountDetail {
  protected readonly _dialogContext = injectBrnDialogContext<DialogData<Account>>();

  readonly digits = { 1: { max: 5 } };

  // delay balance so that is animates smoothly
  balance = toSignal(
    timer(250).pipe(
      map(() => this._dialogContext.data.balance),
      take(1),
    ),
    { initialValue: 0 },
  );
}
