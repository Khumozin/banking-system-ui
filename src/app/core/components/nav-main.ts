import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { BrnCollapsibleImports } from '@spartan-ng/brain/collapsible';
import { RouterLink } from '@angular/router';
import { BrnMenuImports } from '@spartan-ng/brain/menu';
import { HlmMenuImports } from '@spartan-ng/helm/menu';

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
    BrnCollapsibleImports,
    HlmMenuImports,
    BrnMenuImports,
    HlmIcon,
    NgIcon,
    RouterLink,
  ],
  template: `
    <div hlmSidebarGroup>
      <div hlmSidebarGroupLabel>Platform</div>
      <div hlmSidebarGroupContent>
        <ul hlmSidebarMenu>
          @for (item of items(); track $index) {
            <li hlmSidebarMenuItem>
              <a hlmSidebarMenuButton [routerLink]="item.url">
                <ng-icon hlm [name]="item.icon" size="sm" />
                <span>{{ item.title }}</span>
              </a>
              <ng-template #menu>
                <hlm-menu>
                  <button hlmMenuItem>Edit Project</button>
                  <button hlmMenuItem>Delete Project</button>
                </hlm-menu>
              </ng-template>
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
