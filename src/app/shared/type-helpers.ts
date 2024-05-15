import { FormControl, FormGroup } from '@angular/forms';

export type Optional<T> = T | undefined;
export type Nullable<T> = T | null;

export type TypedFormGroup<T> = FormGroup<{
  [K in keyof T]: FormControl<T[K]>;
}>;
