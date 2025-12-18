import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideCopy } from '@ng-icons/lucide';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { take, timer } from 'rxjs';

@Component({
  selector: 'app-account-number',
  imports: [HlmIconImports],
  providers: [provideIcons({ lucideCheck, lucideCopy })],
  template: `
    <span>{{ accountNumber() }}</span>
    <span class="relative inline-flex items-center justify-center ml-2">
      <ng-icon
        hlm
        name="lucideCopy"
        class="transition-all duration-300"
        size="sm"
        [class.scale-0]="copied()"
        [class.opacity-0]="copied()"
      />
      <ng-icon
        hlm
        name="lucideCheck"
        class="absolute transition-all duration-300 text-green-500"
        size="sm"
        [class.scale-100]="copied()"
        [class.opacity-100]="copied()"
        [class.scale-0]="!copied()"
        [class.opacity-0]="!copied()"
      />
    </span>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'inline-flex items-center cursor-pointer',
    '(click)': 'copy()',
  },
})
export default class AccountNumber {
  readonly accountNumber = input.required<string>();

  copied = signal(false);

  copy(): void {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(this.accountNumber()).then(() => {
        this.copied.set(true);
        timer(2000)
          .pipe(take(1))
          .subscribe(() => this.copied.set(false));
      });
    }
  }
}
