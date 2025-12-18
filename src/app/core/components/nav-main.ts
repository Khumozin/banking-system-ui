import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { HlmCollapsibleImports } from '@spartan-ng/helm/collapsible';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';

interface NavMainItem {
  title: string;
  url: string;
  icon?: string;
  isActive?: boolean;
  defaultOpen?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

@Component({
  selector: 'app-nav-main',
  imports: [
    HlmSidebarImports,
    HlmCollapsibleImports,
    HlmDropdownMenuImports,
    HlmIcon,
    NgIcon,
    RouterLink,
    RouterLinkActive,
  ],
  template: `
    <div hlmSidebarGroup>
      <div hlmSidebarGroupLabel>Platform</div>
      <div hlmSidebarGroupContent>
        <ul hlmSidebarMenu>
          @for (item of items(); track $index) {
            <li hlmSidebarMenuItem>
              <a
                hlmSidebarMenuButton
                routerLinkActive
                #rla="routerLinkActive"
                [routerLink]="item.url"
                [class.bg-accent]="rla.isActive"
              >
                <ng-icon hlm [name]="item.icon" size="sm" />
                <span>{{ item.title }}</span>
              </a>
            </li>
          }
        </ul>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NavMain {
  items = input<NavMainItem[]>();
}
