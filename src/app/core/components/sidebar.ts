import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideGalleryVerticalEnd,
  lucideAudioWaveform,
  lucideCommand,
  lucideUsersRound,
  lucideArrowLeftRight,
  lucideBell,
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
    name: 'Khumo Mogorosi',
    email: 'm@example.com',
    avatar: 'https://avatars.githubusercontent.com/u/30941916?s=400&u=99cb30e3609f8089467a7b3bd3f7570b5178e8ea&v=4',
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
      url: 'accounts',
      icon: 'lucideUsersRound',
      isActive: true,
      items: [],
    },
    {
      title: 'Transactions',
      url: 'transactions',
      icon: 'lucideArrowLeftRight',
      items: [],
    },
    {
      title: 'Notifications',
      url: 'notifications',
      icon: 'lucideBell',
      items: [],
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
      lucideUsersRound,
      lucideArrowLeftRight,
      lucideBell,
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
