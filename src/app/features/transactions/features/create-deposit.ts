import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Dialog } from '../../../shared/ui/dialog/dialog';
import { Transaction } from '../data/transaction.model';
import { injectBrnDialogContext } from '@spartan-ng/brain/dialog';
import { DialogData } from '../../../shared/ui/dialog/dialog-data.model';
import { provideIcons } from '@ng-icons/core';
import { lucideArrowUpRight } from '@ng-icons/lucide';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseAddDialog } from '../../../shared/ui/dialog/base-add-dialog';
import DepositForm from '../ui/deposit-form';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { Account } from '../../accounts/data/account.model';
import { TransactionsService } from '../data/internal/transactions-service';
import { AccountsService } from '../../accounts/data/internal/accounts-service';
import { firstValueFrom, from } from 'rxjs';

const FORM_KEY = 'Deposit';

@Component({
  selector: 'app-create-deposit',
  imports: [
    HlmInputImports,
    HlmFieldImports,
    HlmSpinnerImports,
    HlmButtonImports,
    ReactiveFormsModule,
    Dialog,
    DepositForm,
  ],
  providers: [provideIcons({ lucideArrowUpRight })],
  template: `
    <app-dialog
      [title]="_dialogContext.title"
      [description]="_dialogContext.description"
      [icon]="_dialogContext.icon"
    >
      <form content [formGroup]="form" class="w-full flex flex-col p-4" autocomplete="off">
        <app-deposit-form [controlKey]="formKey" [accounts]="_accounts()" />
      </form>
      <ng-container actions>
        <button #action hlmBtn type="submit" [disabled]="isLoading()" (click)="save()">
          @if (isLoading()) {
            <hlm-spinner />
          }

          Make Deposit
        </button>
      </ng-container>
    </app-dialog>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateDeposit extends BaseAddDialog<Transaction> {
  private readonly _transactionsService = inject(TransactionsService);
  private readonly _accountsService = inject(AccountsService);

  protected readonly _accounts = toSignal(from(this._accountsService.getAllAccounts()), {
    initialValue: [],
  });

  protected readonly formKey = FORM_KEY;
  protected readonly entityName = FORM_KEY;

  protected override addFn(item: unknown): Promise<Transaction> {
    return this._transactionsService.createDeposit(item!);
  }

  protected override invalidateKeys(): string[] {
    return ['transactions'];
  }
}
