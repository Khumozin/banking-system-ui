import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideColumns2,
  lucideChevronDown,
  lucidePlus,
  lucideChevronsLeft,
  lucideChevronLeft,
  lucideChevronsRight,
  lucideChevronRight,
  lucideArrowUpRight,
  lucideArrowLeftRight,
  lucideCirclePlus,
  lucideCircleHelp,
  lucideCircleCheckBig,
  lucideCircleDashed,
  lucideCircleOff,
  lucideSearch,
  lucideX,
} from '@ng-icons/lucide';
import { BrnMenuImports } from '@spartan-ng/brain/menu';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogService } from '@spartan-ng/helm/dialog';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmMenuImports } from '@spartan-ng/helm/menu';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { QueryClient, injectQuery } from '@tanstack/angular-query-experimental';
import { ColumnDef, flexRenderComponent, FlexRenderDirective, noop } from '@tanstack/angular-table';
import { filter, take } from 'rxjs';
import { BaseEntityList } from '../../shared/base/base-entity-list';
import { TABLE_PAGINATION } from '../../shared/constants/table.constants';
import { ActionDropdown } from '../../shared/ui/data-table/action-dropdown';
import { TableHeadSelection, TableRowSelection } from '../../shared/ui/data-table/selection-column';
import { TableSortHeaderButton } from '../../shared/ui/data-table/sort-header-button';
import { DialogData } from '../../shared/ui/dialog/dialog-data.model';
import { TransactionsService } from './data/internal/transactions-service';
import { Transaction, TransactionStatus, TransactionType } from './data/transaction.model';
import CreateDeposit from './features/create-deposit';
import CreateTransfer from './features/create-transfer';
import StatusIconCell from './ui/status-icon-cell';
import TypeCell from './ui/type-cell';
import { HlmCommandImports } from '@spartan-ng/helm/command';
import { BrnCommandImports } from '@spartan-ng/brain/command';
import { HlmPopoverImports } from '@spartan-ng/helm/popover';
import { BrnPopoverImports } from '@spartan-ng/brain/popover';
import { StatusIconPipe } from './pipes/status-icon-pipe';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { TypePipe } from './pipes/type-pipe';

@Component({
  selector: 'app-transactions',
  imports: [
    FlexRenderDirective,
    FormsModule,
    BrnMenuImports,
    HlmMenuImports,
    HlmButtonImports,
    NgIcon,
    HlmIconImports,
    HlmInputImports,
    BrnSelectImports,
    HlmSelectImports,
    HlmTableImports,
    BrnPopoverImports,
    HlmCommandImports,
    BrnCommandImports,
    HlmPopoverImports,
    HlmCheckboxImports,
    StatusIconPipe,
    TypePipe,
  ],
  providers: [
    provideIcons({
      lucideColumns2,
      lucideChevronDown,
      lucidePlus,
      lucideChevronsLeft,
      lucideChevronLeft,
      lucideChevronsRight,
      lucideChevronRight,
      lucideArrowUpRight,
      lucideArrowLeftRight,
      lucideCirclePlus,
      lucideCircleDashed,
      lucideCircleOff,
      lucideCircleCheckBig,
      lucideCircleHelp,
      lucideSearch,
      lucideX,
    }),
  ],
  template: `
    <div class="flex items-center justify-between px-4 lg:px-6 mt-4 lg:mt-6">
      <div class="flex flex-col justify-between gap-4 sm:flex-row">
        <input
          hlmInput
          class="w-full md:w-80"
          placeholder="Filter transactions..."
          (input)="_filterChanged($event, 'Name')"
        />

        <brn-popover
          [state]="_statusState()"
          (stateChanged)="statusStateChanged($event)"
          sideOffset="5"
          closeDelay="100"
          align="start"
        >
          <button hlmBtn brnPopoverTrigger variant="outline" size="sm" class="border-dashed">
            <ng-icon hlm name="lucideCirclePlus" class="mr-2" size="sm" />
            Status
            @if (_statusFilter().length) {
              <div
                data-orientation="vertical"
                role="none"
                class="bg-border mx-2 h-4 w-px shrink-0"
              ></div>

              <div class="flex gap-1">
                @for (status of _statusFilter(); track status) {
                  <span class="bg-secondary text-secondary-foreground rounded px-1 py-0.5 text-xs">
                    {{ status }}
                  </span>
                }
              </div>
            }
          </button>
          <hlm-command *brnPopoverContent="let ctx" hlmPopoverContent class="w-[200px] p-0">
            <hlm-command-search>
              <ng-icon hlm name="lucideSearch" class="text-muted-foreground" />
              <input placeholder="Status" hlm-command-search-input />
            </hlm-command-search>
            <div *brnCommandEmpty hlmCommandEmpty>No results found.</div>
            <hlm-command-list>
              <hlm-command-group>
                @for (status of _statuses(); track status) {
                  <button hlm-command-item [value]="status" (selected)="statusSelected(status)">
                    <hlm-checkbox class="mr-2" [checked]="isStatusSelected(status)" />

                    <ng-icon
                      hlm
                      [name]="status | statusIcon"
                      class="text-muted-foreground mx-2"
                      size="sm"
                    />
                    {{ status }}
                  </button>
                }
              </hlm-command-group>
            </hlm-command-list>
          </hlm-command>
        </brn-popover>

        <brn-popover
          [state]="_transactionTypeState()"
          (stateChanged)="transactionTypeStateChanged($event)"
          sideOffset="5"
          closeDelay="100"
          align="start"
        >
          <button hlmBtn brnPopoverTrigger variant="outline" size="sm" class="border-dashed">
            <ng-icon hlm name="lucideCirclePlus" class="mr-2" size="sm" />
            Type
            @if (_transactionTypeFilter().length) {
              <div
                data-orientation="vertical"
                role="none"
                class="bg-border mx-2 h-4 w-px shrink-0"
              ></div>

              <div class="flex gap-1">
                @for (transactionType of _transactionTypeFilter(); track transactionType) {
                  <span class="bg-secondary text-secondary-foreground rounded px-1 py-0.5 text-xs">
                    {{ transactionType }}
                  </span>
                }
              </div>
            }
          </button>
          <hlm-command *brnPopoverContent="let ctx" hlmPopoverContent class="w-[200px] p-0">
            <hlm-command-search>
              <ng-icon hlm name="lucideSearch" class="text-muted-foreground" />
              <input placeholder="Status" hlm-command-search-input />
            </hlm-command-search>
            <div *brnCommandEmpty hlmCommandEmpty>No results found.</div>
            <hlm-command-list>
              <hlm-command-group>
                @for (transactionType of _transactionTypes(); track transactionType) {
                  <button
                    hlm-command-item
                    [value]="transactionType"
                    (selected)="transactionTypeSelected(transactionType)"
                  >
                    <hlm-checkbox
                      class="mr-2"
                      [checked]="isTransactionTypeSelected(transactionType)"
                    />

                    <ng-icon
                      hlm
                      [name]="transactionType | type"
                      class="text-muted-foreground mx-2"
                      size="sm"
                    />
                    {{ transactionType }}
                  </button>
                }
              </hlm-command-group>
            </hlm-command-list>
          </hlm-command>
        </brn-popover>

        @if (_statusFilter().length || _transactionTypeFilter().length) {
          <button hlmBtn variant="ghost" size="sm" align="end" (click)="resetFilters()">
            Reset
            <ng-icon hlm name="lucideX" class="ml-2" size="sm" />
          </button>
        }
      </div>

      <div class="flex gap-2">
        <button hlmBtn variant="outline" size="sm" [brnMenuTriggerFor]="menu">
          <ng-icon hlm name="lucideColumns2" class="mr-2" size="sm" />
          Columns
          <ng-icon hlm name="lucideChevronDown" class="ml-2" size="sm" />
        </button>
        <ng-template #menu>
          <hlm-menu class="w-32">
            @for (column of hidableColumns; track column.id) {
              <button
                hlmMenuItemCheckbox
                class="capitalize"
                [checked]="column.getIsVisible()"
                (triggered)="column.toggleVisibility()"
              >
                <hlm-menu-item-check />
                {{ column.columnDef.id }}
              </button>
            }
          </hlm-menu>
        </ng-template>

        <button hlmBtn size="sm" variant="outline" (click)="makeDeposit()">
          <ng-icon hlm name="lucideArrowUpRight" class="mr-2" size="sm" />
          Deposit
        </button>

        <button hlmBtn size="sm" variant="outline" (click)="transferMoney()">
          <ng-icon hlm name="lucideArrowLeftRight" class="mr-2" size="sm" />
          Transfer
        </button>
      </div>
    </div>

    <div
      class="flex-1 outline-none relative flex flex-col gap-4 overflow-auto px-4 lg:px-6 mb-4 lg:mb-6"
    >
      <div class="overflow-hidden rounded-lg border">
        <table hlmTable class="w-full">
          <thead hlmTHead>
            @for (headerGroup of _table.getHeaderGroups(); track headerGroup.id) {
              <tr hlmTr>
                @for (header of headerGroup.headers; track header.id) {
                  <th hlmTh [attr.colSpan]="header.colSpan">
                    @if (!header.isPlaceholder) {
                      <ng-container
                        *flexRender="
                          header.column.columnDef.header;
                          props: header.getContext();
                          let headerText
                        "
                      >
                        <div [innerHTML]="headerText"></div>
                      </ng-container>
                    }
                  </th>
                }
              </tr>
            }
          </thead>
          <tbody hlmTBody class="w-full">
            @for (row of _table.getRowModel().rows; track row.id) {
              <tr hlmTr [attr.key]="row.id" [attr.data-state]="row.getIsSelected() && 'selected'">
                @for (cell of row.getVisibleCells(); track $index) {
                  <td hlmTd>
                    <ng-container
                      *flexRender="
                        cell.column.columnDef.cell;
                        props: cell.getContext();
                        let cellCtx
                      "
                    >
                      <div [innerHTML]="cellCtx" [class.pl-3]="cell.column.getCanSort()"></div>
                    </ng-container>
                  </td>
                }
              </tr>
            } @empty {
              <tr hlmTr>
                <td hlmTd class="h-24 text-center" [attr.colspan]="columns.length">No results.</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <div class="flex items-center justify-between px-4">
        @if (_table.getRowCount() > 0) {
          <span class="text-muted-foreground hidden flex-1 text-sm lg:flex">
            {{ _table.getSelectedRowModel().rows.length }} of {{ _table.getRowCount() }}
            row(s) selected
          </span>

          <div class="flex w-full items-center gap-8 lg:w-fit">
            <div class="hidden items-center gap-2 lg:flex">
              <label hlmLabel>Rows per page</label>

              <brn-select
                class="inline-block"
                [ngModel]="_table.getState().pagination.pageSize"
                (ngModelChange)="_table.setPageSize($event); _table.resetPageIndex()"
              >
                <hlm-select-trigger class="h-8 mr-1 inline-flex" _size="sm">
                  <hlm-select-value />
                </hlm-select-trigger>
                <hlm-select-content>
                  @for (size of _availablePageSizes; track size) {
                    <hlm-option [value]="size">
                      {{ size === tableConstants.SHOW_ALL_SIZE ? 'All' : size }}
                    </hlm-option>
                  }
                </hlm-select-content>
              </brn-select>
            </div>

            <div class="flex w-fit items-center justify-center text-sm font-medium">
              Page {{ _table.getState().pagination.pageIndex + 1 }} of {{ _table.getPageCount() }}
            </div>

            <div class="ml-auto flex items-center gap-2 lg:ml-0">
              <button
                size="icon"
                variant="outline"
                class="w-8 h-8"
                hlmBtn
                [disabled]="!_table.getCanPreviousPage()"
                (click)="_table.setPageIndex(0)"
              >
                <ng-icon hlm name="lucideChevronsLeft" size="sm" />
              </button>

              <button
                size="icon"
                variant="outline"
                class="w-8 h-8"
                hlmBtn
                [disabled]="!_table.getCanPreviousPage()"
                (click)="_table.previousPage()"
              >
                <ng-icon hlm name="lucideChevronLeft" size="sm" />
              </button>

              <button
                size="icon"
                variant="outline"
                class="w-8 h-8"
                hlmBtn
                [disabled]="!_table.getCanNextPage()"
                (click)="_table.nextPage()"
              >
                <ng-icon hlm name="lucideChevronRight" size="sm" />
              </button>

              <button
                size="icon"
                variant="outline"
                class="w-8 h-8"
                hlmBtn
                [disabled]="!_table.getCanNextPage()"
                (click)="_table.setPageIndex(_table.getPageCount() - 1)"
              >
                <ng-icon hlm name="lucideChevronsRight" size="sm" />
              </button>
            </div>
          </div>
        } @else {
          <div class="flex h-full w-full items-center justify-center">
            <div class="text-muted-foreground text-sm">No Data</div>
          </div>
        }
      </div>
    </div>
  `,
  styles: ``,
  host: {
    class: 'flex w-full h-full flex-col justify-start gap-6',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Transactions extends BaseEntityList<Transaction> {
  private readonly _transactionsService = inject(TransactionsService);
  private readonly _hlmDialogService = inject(HlmDialogService);
  private readonly _queryClient = inject(QueryClient);

  protected readonly _statusFilter = signal<TransactionStatus[]>([]);
  protected readonly _statuses = signal([
    'PENDING',
    'COMPLETED',
    'FAILED',
  ] satisfies TransactionStatus[]);
  protected readonly _statusState = signal<'closed' | 'open'>('closed');

  protected readonly _transactionTypeFilter = signal<TransactionType[]>([]);
  protected readonly _transactionTypes = signal([
    'DEPOSIT',
    'TRANSFER',
  ] satisfies TransactionType[]);
  protected readonly _transactionTypeState = signal<'closed' | 'open'>('closed');

  protected readonly tableConstants = TABLE_PAGINATION;

  private readonly _transactionsQuery = injectQuery(() => ({
    queryKey: ['transactions'],
    queryFn: () => this._transactionsService.getAllTransactions(),
    initialData: [],
    retry: 1,
    refetchOnWindowFocus: true,
  }));

  override get data(): Transaction[] {
    return this._transactionsQuery.data();
  }

  override columns: ColumnDef<Transaction>[] = [
    {
      id: 'select',
      header: () => flexRenderComponent(TableHeadSelection),
      cell: () => flexRenderComponent(TableRowSelection),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'transactionId',
      id: 'Trans Id',
      header: () => flexRenderComponent(TableSortHeaderButton),
    },
    {
      accessorKey: 'transactionType',
      id: 'type',
      filterFn: 'arrIncludesSome',
      header: () => flexRenderComponent(TableSortHeaderButton),
      cell: () => flexRenderComponent(TypeCell),
    },
    {
      accessorKey: 'amount',
      id: 'amount',
      header: () => flexRenderComponent(TableSortHeaderButton),
      cell: (info) => {
        const amount = parseFloat(info.getValue<string>());
        const formatted = new Intl.NumberFormat('en-ZA', {
          style: 'currency',
          currency: 'ZAR',
        }).format(amount);

        return `<div>${formatted}</div>`;
      },
    },
    {
      accessorKey: 'status',
      id: 'status',
      filterFn: 'arrIncludesSome',
      header: () => flexRenderComponent(TableSortHeaderButton),
      cell: () => flexRenderComponent(StatusIconCell),
    },
    {
      accessorKey: 'createdAt',
      id: 'Created At',
      header: () => flexRenderComponent(TableSortHeaderButton),
      cell: (info) => {
        const date = new Date(info.getValue<string>());
        const parts = new Intl.DateTimeFormat('en-ZA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false, // en-ZA is already 24-hour, but this explicitly ensures it
        })
          .formatToParts(date)
          .reduce(
            (acc, part) => {
              acc[part.type] = part.value;
              return acc;
            },
            {} as Record<string, unknown>,
          );

        const formatted = `${parts['year']}-${parts['month']}-${parts['day']} ${parts['hour']}:${parts['minute']}:${parts['second']}`;
        return `<div>${formatted}</div>`;
      },
    },
  ];

  protected makeDeposit(): void {
    const context: DialogData<Transaction | null> = {
      title: 'Make a Deposit',
      description: 'Deposit money into an account',
      icon: 'lucideArrowUpRight',
      data: null,
    };

    const dialogRef = this._hlmDialogService.open(CreateDeposit, {
      context,
      contentClass: 'sm:!max-w-[750px] w-[460px]',
    });

    dialogRef.closed$.pipe(filter(Boolean), take(1)).subscribe(noop);
  }

  protected transferMoney(): void {
    const context: DialogData<Transaction | null> = {
      title: 'Transfer Money',
      description: 'Transfer money between accounts',
      icon: 'lucideArrowLeftRight',
      data: null,
    };

    const dialogRef = this._hlmDialogService.open(CreateTransfer, {
      context,
      contentClass: 'sm:!max-w-[750px] w-[460px]',
    });

    dialogRef.closed$.pipe(filter(Boolean), take(1)).subscribe(noop);
  }

  isStatusSelected(status: TransactionStatus): boolean {
    return this._statusFilter().some((s) => s === status);
  }

  statusStateChanged(state: 'open' | 'closed') {
    this._statusState.set(state);
  }

  statusSelected(status: TransactionStatus): void {
    const current = this._statusFilter();
    const index = current.indexOf(status);
    if (index === -1) {
      this._statusFilter.set([...current, status]);
    } else {
      this._statusFilter.set(current.filter((s) => s !== status));
    }
    this._table.getColumn('status')?.setFilterValue(this._statusFilter());
  }

  isTransactionTypeSelected(transactionType: TransactionType): boolean {
    return this._transactionTypeFilter().some((s) => s === transactionType);
  }

  transactionTypeStateChanged(state: 'open' | 'closed') {
    this._transactionTypeState.set(state);
  }

  transactionTypeSelected(transactionType: TransactionType): void {
    const current = this._transactionTypeFilter();
    const index = current.indexOf(transactionType);
    if (index === -1) {
      this._transactionTypeFilter.set([...current, transactionType]);
    } else {
      this._transactionTypeFilter.set(current.filter((s) => s !== transactionType));
    }
    this._table.getColumn('type')?.setFilterValue(this._transactionTypeFilter());
  }

  resetFilters(): void {
    this._transactionTypeFilter.set([]);
    this._statusFilter.set([]);
    this._table.resetColumnFilters();
  }
}
