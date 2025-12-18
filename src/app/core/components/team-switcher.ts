import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';
import { HlmCollapsibleImports } from '@spartan-ng/helm/collapsible';

import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';

interface Team {
  name: string;
  logo: string;
  plan: string;
}

@Component({
  selector: 'app-team-switcher',
  imports: [HlmSidebarImports, HlmCollapsibleImports, HlmDropdownMenuImports, HlmIcon, NgIcon],
  providers: [provideIcons({ lucidePlus })],
  template: `
    <ul hlmSidebarMenu>
      <li hlmSidebarMenuItem>
        <!-- class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"   -->
        <a
          hlmSidebarMenuButton
          [hlmDropdownMenuTrigger]="menu"
          align="center"
          size="lg"
          class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <!-- bg-foreground text-accent  -->
          <div
            class="bg-primary text-sidebar-accent flex aspect-square size-8 items-center justify-center rounded-lg border"
          >
            <ng-icon hlm [name]="activeTeam()?.logo" class="size-4" size="sm" />
          </div>
          <div class="grid flex-1 text-left text-sm leading-tight">
            <span class="truncate font-medium">{{ activeTeam()?.name }}</span>
            <span class="truncate text-xs">{{ activeTeam()?.plan }}</span>
          </div>
          <ng-icon hlm name="lucideChevronsUpDown" size="sm" class="ml-auto" />
        </a>
      </li>
    </ul>

    <ng-template #menu>
      <hlm-dropdown-menu class="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg">
        <hlm-dropdown-menu-label class="text-muted-foreground text-xs">
          Teams
        </hlm-dropdown-menu-label>

        <hlm-dropdown-menu-group>
          @for (team of teams(); track $index) {
            <button hlmDropdownMenuItem class="gap-2 p-2" (click)="activeTeam.set(team)">
              <div class="flex size-6 items-center justify-center rounded-md border">
                <ng-icon hlm [name]="team.logo" class="size-3.5 shrink-0" size="sm" />
              </div>
              {{ team.name }}
              <div hlmSidebarMenuBadge>⌘{{ $index + 1 }}</div>
            </button>
          }
        </hlm-dropdown-menu-group>

        <hlm-dropdown-menu-separator />

        <hlm-dropdown-menu-group>
          <button hlmDropdownMenuItem class="gap-2 p-2">
            <div class="flex size-6 items-center justify-center rounded-md border bg-transparent">
              <ng-icon hlm name="lucidePlus" size="sm" class="size-4" />
            </div>
            <div class="text-muted-foreground font-medium">Add team</div>
          </button>
        </hlm-dropdown-menu-group>
      </hlm-dropdown-menu>
    </ng-template>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TeamSwitcher {
  readonly teams = input<Team[]>();

  readonly activeTeam = linkedSignal(() => {
    const teams = this.teams();
    if (teams) {
      return teams[0];
    }

    return null;
  });
}
