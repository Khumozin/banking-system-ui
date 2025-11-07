import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CellContext, injectFlexRenderContext } from '@tanstack/angular-table';
import { Transaction } from '../data/transaction.model';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCircle,
  lucideCircleDot,
  lucideCircleDashed,
  lucideCircleOff,
  lucideCircleCheckBig,
  lucideCircleHelp,
} from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { StatusIconPipe } from '../pipes/status-icon-pipe';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-status-icon-cell',
  imports: [StatusIconPipe, TitleCasePipe, NgIcon, HlmIcon],
  providers: [
    provideIcons({
      lucideCircleDashed,
      lucideCircleOff,
      lucideCircleCheckBig,
      lucideCircleHelp,
    }),
  ],
  template: `
    <div class="flex items-center">
      <ng-icon
        hlm
        class="text-muted-foreground mr-2"
        size="sm"
        [name]="_element.status | statusIcon"
      />
      {{ _element.status | titlecase }}
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StatusIconCell {
  private readonly _context = injectFlexRenderContext<CellContext<Transaction, unknown>>();
  protected readonly _element = this._context.row.original;
}
