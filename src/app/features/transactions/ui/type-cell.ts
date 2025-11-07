import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Transaction } from '../data/transaction.model';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeftRight, lucideArrowUpRight, lucideEllipsis } from '@ng-icons/lucide';
import { injectFlexRenderContext, CellContext } from '@tanstack/angular-table';
import { TitleCasePipe } from '@angular/common';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { TypePipe } from '../pipes/type-pipe';

@Component({
  selector: 'app-type-cell',
  imports: [TitleCasePipe, TypePipe, NgIcon, HlmIcon],
  providers: [provideIcons({ lucideEllipsis, lucideArrowUpRight, lucideArrowLeftRight })],
  template: `
    <div class="flex items-center">
      <ng-icon
        hlm
        class="text-muted-foreground mr-2"
        size="sm"
        [name]="_element.transactionType | type"
      />
      {{ _element.transactionType | titlecase }}
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TypeCell {
  private readonly _context = injectFlexRenderContext<CellContext<Transaction, unknown>>();
  protected readonly _element = this._context.row.original;
}
