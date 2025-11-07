import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideGalleryVerticalEnd,
  lucideAudioWaveform,
  lucideCommand,
  lucideSquareTerminal,
  lucideBot,
  lucideBookOpen,
  lucideSettings2,
  lucideFrame,
  lucideChartPie,
  lucideMap,
  lucideChevronRight,
  lucideChevronsUpDown,
  lucideZap,
} from '@ng-icons/lucide';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import NavMain from './nav-main';
import NavUser from './nav-user';
import { HlmIcon } from '@spartan-ng/helm/icon';
import TeamSwitcher from './team-switcher';

const data = {
  user: {
    name: 'spartan',
    email: 'm@example.com',
    avatar: 'https://spartan.ng/assets/avatar.png',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: 'lucideGalleryVerticalEnd',
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: 'lucideAudioWaveform',
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: 'lucideCommand',
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Accounts',
      url: '',
      icon: 'lucideSquareTerminal',
      isActive: true,
      items: [
        {
          title: 'All Accounts',
          url: '',
        },
      ],
    },
    {
      title: 'Transactions',
      url: '',
      icon: 'lucideBot',
      items: [
        {
          title: 'All Transactions',
          url: '',
        },
        {
          title: 'Deposit',
          url: '',
        },
        {
          title: 'Transfer',
          url: '',
        },
      ],
    },
    {
      title: 'Notifications',
      url: 'notifications',
      icon: 'lucideBookOpen',
      items: [
        {
          title: 'All Notifications',
          url: '',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '',
      icon: 'lucideFrame',
    },
    {
      name: 'Sales & Marketing',
      url: '',
      icon: 'lucideChartPie',
    },
    {
      name: 'Travel',
      url: '/projects',
      icon: 'lucideMap',
    },
  ],
};

@Component({
  selector: 'app-sidebar',
  imports: [HlmSidebarImports, NavMain, NavUser, TeamSwitcher],
  providers: [
    provideIcons({
      lucideGalleryVerticalEnd,
      lucideAudioWaveform,
      lucideCommand,
      lucideSquareTerminal,
      lucideBot,
      lucideBookOpen,
      lucideSettings2,
      lucideFrame,
      lucideChartPie,
      lucideMap,
      lucideChevronRight,
      lucideChevronsUpDown,
      lucideZap,
    }),
  ],
  template: `
    <hlm-sidebar [collapsible]="'icon'" data-cy="sidebar">
      <div hlmSidebarHeader>
        <app-team-switcher [teams]="data.teams" />
      </div>
      <div hlmSidebarContent>
        <app-nav-main [items]="data.navMain" />
        <!-- <app-nav-projects [items]="data.projects" /> -->
      </div>
      <div hlmSidebarFooter>
        <app-nav-user [user]="data.user" />
      </div>
    </hlm-sidebar>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Sidebar {
  data = data;
}
