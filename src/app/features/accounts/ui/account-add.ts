import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { BaseAddDialog } from '../../../shared/ui/dialog/base-add-dialog';
import { AccountsService } from '../data/internal/accounts-service';
import { Account } from '../data/account.model';
import { lucideLoaderCircle, lucideUserRound } from '@ng-icons/lucide';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { Dialog } from '../../../shared/ui/dialog/dialog';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import AccountForm from './account-form';

const FORM_KEY = 'Account';

@Component({
  selector: 'app-account-add',
  imports: [
    HlmInputImports,
    HlmFieldImports,
    HlmSpinnerImports,
    HlmButtonImports,
    ReactiveFormsModule,
    Dialog,
    AccountForm,
  ],
  providers: [provideIcons({ lucideLoaderCircle, lucideUserRound })],
  template: `
    <app-dialog
      [title]="_dialogContext.title"
      [description]="_dialogContext.description"
      [icon]="_dialogContext.icon"
    >
      <form content [formGroup]="form" class="w-full flex flex-col p-4" autocomplete="off">
        <app-account-form [controlKey]="formKey" />
      </form>
      <ng-container actions>
        <button #action hlmBtn type="submit" [disabled]="isLoading()" (click)="save()">
          @if (isLoading()) {
            <hlm-spinner />
          }

          Create Account
        </button>
      </ng-container>
    </app-dialog>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AccountAdd extends BaseAddDialog<Account> {
  private readonly _accountsService = inject(AccountsService);

  protected readonly formKey = FORM_KEY;
  protected readonly entityName = FORM_KEY;

  protected override addFn(item: Account): Promise<Account> {
    return this._accountsService.addAccount(item);
  }

  protected override invalidateKeys(): string[] {
    return ['accounts'];
  }
}
