import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';

@Component({
  selector: 'app-account-form',
  imports: [ReactiveFormsModule, HlmInputImports, HlmFieldImports],
  template: `
    <ng-container [formGroupName]="controlKey()">
      <fieldset hlmFieldSet>
        <div hlmFieldGroup>
          <div hlmField>
            <label hlmFieldLabel for="ownerName">Owner Name</label>
            <input
              hlmInput
              id="ownerName"
              type="text"
              placeholder="Khumo Mogorosi"
              formControlName="ownerName"
            />
          </div>
          <div hlmField>
            <label hlmFieldLabel for="initialBalance">Initial Balance</label>
            <input
              hlmInput
              id="initialBalance"
              type="number"
              placeholder="0.00"
              formControlName="initialBalance"
            />
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
export default class AccountForm {
  private readonly _parentContainer = inject(ControlContainer);
  private readonly _nnfb = inject(NonNullableFormBuilder);

  readonly controlKey = input.required<string>();

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
      ownerName: ['', Validators.required],
      initialBalance: ['', Validators.required],
    });

    this.parentFormGroup.addControl(this.controlKey(), group);
  }
}
