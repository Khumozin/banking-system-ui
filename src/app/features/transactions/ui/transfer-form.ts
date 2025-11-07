import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import {
  ReactiveFormsModule,
  ControlContainer,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { Account } from '../../accounts/data/account.model';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { BrnSelectImports } from '@spartan-ng/brain/select';

@Component({
  selector: 'app-transfer-form',
  imports: [
    ReactiveFormsModule,
    HlmInputImports,
    HlmFieldImports,
    HlmSelectImports,
    BrnSelectImports,
  ],
  template: `
    <ng-container [formGroupName]="controlKey()">
      <fieldset hlmFieldSet>
        <div hlmFieldGroup>
          <div hlmField>
            <label hlmFieldLabel for="sourceAccountId">Source Account</label>
            <brn-select
              class="inline-block"
              placeholder="Choose a source account"
              formControlName="sourceAccountId"
            >
              <hlm-select-trigger class="w-full" id="sourceAccountId">
                <hlm-select-value />
              </hlm-select-trigger>
              <hlm-select-content>
                @for (account of accounts(); track account.accountId) {
                  <hlm-option [value]="account.accountId">{{ account.ownerName }}</hlm-option>
                }
              </hlm-select-content>
            </brn-select>
          </div>
          <div hlmField>
            <label hlmFieldLabel for="destinationAccountId">Destination Account</label>
            <brn-select
              class="inline-block"
              placeholder="Choose a destination account"
              formControlName="destinationAccountId"
            >
              <hlm-select-trigger class="w-full" id="destinationAccountId">
                <hlm-select-value />
              </hlm-select-trigger>
              <hlm-select-content>
                @for (account of accounts(); track account.accountId) {
                  <hlm-option [value]="account.accountId">{{ account.ownerName }}</hlm-option>
                }
              </hlm-select-content>
            </brn-select>
          </div>
          <div hlmField>
            <label hlmFieldLabel for="amount">Amount</label>
            <input hlmInput id="amount" type="number" placeholder="0.00" formControlName="amount" />
          </div>
        </div>
      </fieldset>
    </ng-container>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export default class TransferForm {
  private readonly _parentContainer = inject(ControlContainer);
  private readonly _nnfb = inject(NonNullableFormBuilder);

  readonly controlKey = input.required<string>();
  readonly accounts = input.required<Account[]>();

  get parentFormGroup(): FormGroup {
    return this._parentContainer.control as FormGroup;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.parentFormGroup.removeControl(this.controlKey());
  }

  private buildForm(): void {
    const group = this._nnfb.group({
      sourceAccountId: ['', Validators.required],
      destinationAccountId: ['', Validators.required],
      amount: ['', Validators.required],
    });

    this.parentFormGroup.addControl(this.controlKey(), group);
  }
}
