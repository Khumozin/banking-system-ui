import { ChangeDetectionStrategy, Component, inject, input, resource } from '@angular/core';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { TransactionsService } from '../../transactions/data/internal/transactions-service';
import { from } from 'rxjs';
import { HlmScrollAreaImports } from '@spartan-ng/helm/scroll-area';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-account-transaction-history',
  imports: [HlmFieldImports, HlmSeparatorImports, HlmScrollAreaImports, NgScrollbarModule, TitleCasePipe, DatePipe],
  template: `
    <fieldset hlmFieldSet class="gap-3">
      <legend hlmFieldLegend>Transaction History</legend>
      <p hlmFieldDescription>All transactions involving this account</p>

      <ng-scrollbar hlm class="h-72 w-full">
        <div>
          @for (transaction of _transactions.value(); track transaction.transactionId) {
            <div class="text-sm">
              <div class="w-full grid grid-cols-6">
                <div class="col-span-1 truncate font-mono">{{ transaction.transactionId }}</div>
                <div class="col-span-1">{{ transaction.transactionType | titlecase}}</div>
                <div class="col-span-1">{{ transaction.amount }}</div>
                <div class="col-span-1">{{ transaction.status | titlecase}}</div>
                <div class="col-span-2">{{ transaction.createdAt | date:'yyyy/MM/dd HH:mm:ss' }}</div>
              </div>
              <div hlmSeparator class="my-2"></div>
            </div>
          }
        </div>
      </ng-scrollbar>
    </fieldset>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AccountTransactionHistory {
  private readonly _transactionsService = inject(TransactionsService);

  readonly accountId = input.required<string>();

  protected readonly _transactions = resource({
    params: () => this.accountId(),
    loader: ({ params }) => this._transactionsService.getTransactionsByAccount(params),
    defaultValue: [],
  });
}
