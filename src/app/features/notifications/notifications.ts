import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBell, lucideRefreshCcw } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmEmptyImports } from '@spartan-ng/helm/empty';

@Component({
  selector: 'app-notifications',
  imports: [NgIcon, HlmButton, HlmEmptyImports],
  providers: [provideIcons({ lucideBell, lucideRefreshCcw })],
  template: `
    <div hlmEmpty class="h-full w-full">
      <div hlmEmptyHeader>
        <div hlmEmptyMedia variant="icon">
          <ng-icon name="lucideBell" />
        </div>
        <div hlmEmptyTitle>No notifications</div>
        <div hlmEmptyDescription>You're all caught up. New notifications will appear here.</div>
      </div>
      <div hlmEmptyContent>
        <button hlmBtn variant="outline">
          <ng-icon hlm name="lucideRefreshCcw" />
          Refresh
        </button>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Notifications {}
