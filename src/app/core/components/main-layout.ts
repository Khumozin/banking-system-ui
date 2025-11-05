import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';
import { BrnMenuImports } from '@spartan-ng/brain/menu';
import { HlmMenuImports } from '@spartan-ng/helm/menu';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { Breadcrumb } from './breadcrumb';
import Sidebar from './sidebar';
import ThemeToggle from './theme-toggle';

@Component({
  selector: 'app-main-layout',
  imports: [
    HlmSidebarImports,
    HlmMenuImports,
    BrnMenuImports,
    Sidebar,
    Breadcrumb,
    ThemeToggle,
    RouterOutlet,
  ],
  providers: [
    provideIcons({
      lucideChevronDown,
    }),
  ],
  template: `
    <div hlmSidebarWrapper>
      <app-sidebar />
      <main hlmSidebarInset class="flex flex-1 flex-col">
        <header
          class="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
        >
          <div class="flex items-center gap-2 px-4">
            <button hlmSidebarTrigger class="-ml-1">
              <span class="sr-only"></span>
            </button>
            <app-breadcrumb />
          </div>

          <app-theme-toggle class="px-4" />
        </header>

        <div class="flex-1 overflow-y-auto">
          <router-outlet />
        </div>
      </main>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MainLayout {
  protected readonly _items = [
    {
      title: 'Home',
      url: '#',
      icon: 'lucideHouse',
    },
    {
      title: 'Inbox',
      url: '#',
      icon: 'lucideInbox',
    },
    {
      title: 'Calendar',
      url: '#',
      icon: 'lucideCalendar',
    },
    {
      title: 'Search',
      url: '#',
      icon: 'lucideSearch',
    },
    {
      title: 'Settings',
      url: '#',
      icon: 'lucideSettings',
    },
  ];
}
