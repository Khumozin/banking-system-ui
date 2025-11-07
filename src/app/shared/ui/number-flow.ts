import { ChangeDetectionStrategy, Component } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import {
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  input,
  output,
  PLATFORM_ID,
} from '@angular/core';
import NumberFlowLite, { Data, Format, formatToData, renderInnerHTML, Value } from 'number-flow';

@Component({
  selector: 'app-number-flow',
  imports: [],
  template: `
    <number-flow
      [attr.aria-label]="data().valueAsString"
      role="img"
      [attr.data-will-change]="willChange() ? '' : undefined"
      (animationsstart)="animationsstart.emit()"
      (animationsfinish)="animationsfinish.emit()"
      [transformTiming]="transformTiming()"
      [spinTiming]="spinTiming()"
      [opacityTiming]="opacityTiming()"
      [animated]="animated()"
      [respectMotionPreference]="respectMotionPreference()"
      [trend]="trend()"
      [plugins]="plugins()"
      [digits]="digits()"
      [data]="data()"
    >
      @if (isBrowser) {
        <span [innerHTML]="innerHtml()"></span>
      }
    </number-flow>
  `,
  styles: `
    :host {
      --number-flow-char-height: var(--number-flow-char-height, 1em);
      --number-flow-mask-height: var(--number-flow-mask-height, 0.25em);
      --number-flow-mask-width: var(--number-flow-mask-width, 0.5em);
      font-variant-numeric: tabular-nums;
    }

    number-flow {
      all: inherit;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class NumberFlow {
  public locales = input<string | string[]>();
  public format = input<Format>();
  public value = input.required<Value>();
  public prefix = input<string>();
  public suffix = input<string>();
  public willChange = input<boolean>(false);
  public transformTiming = input(NumberFlowLite.defaultProps.transformTiming);
  public spinTiming = input(NumberFlowLite.defaultProps.spinTiming);
  public opacityTiming = input(NumberFlowLite.defaultProps.opacityTiming);
  public animated = input(NumberFlowLite.defaultProps.animated);
  public respectMotionPreference = input(NumberFlowLite.defaultProps.respectMotionPreference);
  public trend = input(NumberFlowLite.defaultProps.trend);
  public digits = input(NumberFlowLite.defaultProps.digits);
  public plugins = input(NumberFlowLite.defaultProps.plugins);

  public animationsstart = output();
  public animationsfinish = output();

  public formatter = computed(() => new Intl.NumberFormat(this.locales(), this.format()));
  public data = computed<Data>(() =>
    formatToData(this.value(), this.formatter(), this.prefix(), this.suffix()),
  );
  public innerHtml = computed(() =>
    renderInnerHTML(this.value(), {
      locales: this.locales(),
      format: this.format(),
      numberPrefix: this.prefix(),
      numberSuffix: this.suffix(),
    }),
  );
  public isBrowser = isPlatformServer(inject(PLATFORM_ID));
}
