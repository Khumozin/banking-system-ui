import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrnCheckboxImports } from '@spartan-ng/brain/checkbox';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { CellContext, HeaderContext, injectFlexRenderContext } from '@tanstack/angular-table';

@Component({
  selector: 'app-selection-column',
  imports: [BrnCheckboxImports, HlmCheckboxImports],
  template: `
    <hlm-checkbox
      [checked]="_context.table.getIsAllRowsSelected()"
      [indeterminate]="_context.table.getIsSomeRowsSelected()"
      (checkedChange)="_context.table.toggleAllRowsSelected()"
    />
  `,
  styles: ``,
  host: {
    class: 'flex',
    'aria-label': 'Select all',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeadSelection<T> {
  protected readonly _context = injectFlexRenderContext<HeaderContext<T, unknown>>();
}

@Component({
  imports: [BrnCheckboxImports, HlmCheckboxImports],
  template: `
    <hlm-checkbox
      type="checkbox"
      [checked]="_context.row.getIsSelected()"
      (checkedChange)="_context.row.getToggleSelectedHandler()($event)"
    />
  `,
  host: {
    class: 'flex',
    'aria-label': 'Select Row',
  },
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableRowSelection<T> {
  protected readonly _context = injectFlexRenderContext<CellContext<T, unknown>>();
}
