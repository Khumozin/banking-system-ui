import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideEllipsis } from '@ng-icons/lucide';
import { CellContext, injectFlexRenderContext } from '@tanstack/angular-table';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';

import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-action-dropdown',
  imports: [HlmIcon, NgIcon, HlmButtonImports, HlmDropdownMenuImports],
  providers: [provideIcons({ lucideEllipsis })],
  template: `
    <button
      hlmBtn
      variant="ghost"
      class="h-8 w-8 p-0"
      [hlmDropdownMenuTrigger]="ActionDropDownMenu"
    >
      <span class="sr-only">Open menu</span>
      <ng-icon hlm size="sm" name="lucideEllipsis" />
    </button>

    <ng-template #ActionDropDownMenu>
      <hlm-dropdown-menu>
        <hlm-dropdown-menu-label>Actions</hlm-dropdown-menu-label>
        <!-- <button hlmDropdownMenuItem (click)="updateHandler()">Update</button>
        <button hlmDropdownMenuItem (click)="deleteHandler()">Delete</button> -->
        <button hlmDropdownMenuItem (click)="viewHandler()">View</button>
      </hlm-dropdown-menu>
    </ng-template>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionDropdown<T> {
  private readonly _context = injectFlexRenderContext<CellContext<T, unknown>>();

  readonly view = output<T>();

  readonly update = output<T>();

  readonly delete = output<T>();

  viewHandler(): void {
    this.view.emit(this._context.row.original);
  }

  updateHandler(): void {
    this.update.emit(this._context.row.original);
  }

  deleteHandler(): void {
    this.delete.emit(this._context.row.original);
  }
}
