import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import TransferForm from '../ui/transfer-form';
import { ReactiveFormsModule } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { lucideArrowLeftRight } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { Dialog } from '../../../shared/ui/dialog/dialog';
import { BaseAddDialog } from '../../../shared/ui/dialog/base-add-dialog';
import { TransactionsService } from '../data/internal/transactions-service';
import { Transaction } from '../data/transaction.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { from } from 'rxjs';
import { AccountsService } from '../../accounts/data/internal/accounts-service';

const FORM_KEY = 'Transaction';

@Component({
  selector: 'app-create-transfer',
  imports: [
    HlmInputImports,
    HlmFieldImports,
    HlmSpinnerImports,
    HlmButtonImports,
    ReactiveFormsModule,
    Dialog,
    TransferForm,
  ],
  providers: [provideIcons({ lucideArrowLeftRight })],
  template: `
    <app-dialog
      [title]="_dialogContext.title"
      [description]="_dialogContext.description"
      [icon]="_dialogContext.icon"
    >
      <form content [formGroup]="form" class="w-full flex flex-col p-4" autocomplete="off">
        <app-transfer-form [controlKey]="formKey" [accounts]="_accounts()" />
      </form>
      <ng-container actions>
        <button #action hlmBtn type="submit" [disabled]="isLoading()" (click)="save()">
          @if (isLoading()) {
            <hlm-spinner />
          }

          Transfer Money
        </button>
      </ng-container>
    </app-dialog>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateTransfer extends BaseAddDialog<Transaction> {
  private readonly _transactionsService = inject(TransactionsService);
  private readonly _accountsService = inject(AccountsService);

  protected readonly _accounts = toSignal(from(this._accountsService.getAllAccounts()), {
    initialValue: [],
  });

  protected readonly formKey = FORM_KEY;
  protected readonly entityName = FORM_KEY;

  protected override addFn(item: unknown): Promise<Transaction> {
    return this._transactionsService.createTransfer(item!);
  }

  protected override invalidateKeys(): string[] {
    return ['transactions'];
  }
}
