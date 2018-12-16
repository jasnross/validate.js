// Namespace
declare namespace validate {
  export interface AsyncValidateOption {
    wrapErrors?: Function;
    prettify?: Function;
    cleanAttributes?: boolean;
  }

  export interface CollectFormValuesOption {
    nullify?: boolean;
    trim?: boolean;
  }

  export interface ValidateOption {
    format?: string;
    prettify?: Function;
    fullMessages?: boolean;
  }

  // Gets a union type representing names of properties that match the given type
  // Example: `FilterPropNames<{prop1: string, prop2: boolean, prop3: string}, string> // => 'prop1' | 'prop3'`
  type FilterPropNames<T, ValueType> = {
    [P in keyof T]: T[P] extends ValueType ? P : never
  }[keyof T];

  type Diff<T, U> = T extends U ? never : T;

  type ConstraintOptionsCommon = {
    message?: string;
  };

  export interface ValidateOption {
    format?: string;
    prettify?: Function;
    fullMessages?: boolean;
  }

  export interface AsyncValidateOption {
    wrapErrors?: Function;
    prettify?: Function;
    cleanAttributes?: boolean;
  }

  export interface CollectFormValuesOption {
    nullify?: boolean;
    trim?: boolean;
  }

  export type DateTimeValidator =
    | boolean
    | ConstraintOptionsCommon & {
        dateOnly: boolean;
      };

  export type PresenceValidator =
    | boolean
    | ConstraintOptionsCommon & {
        allowEmpty?: boolean;
      };

  export type EmailValidator = boolean;

  export type EqualityValidator<T, P> =
    | Diff<FilterPropNames<T, T[P]>, P>
    | ConstraintOptionsCommon & {
        attribute: Diff<FilterPropNames<T, T[P]>, P>;
        comparator?: (v1: T[P], v2: T[P]) => boolean;
      };

  export type ExclusionValidator<T, P> =
    | T[P][]
    | ConstraintOptionsCommon & {
        within: { [key: string]: string };
      };

  // Inclusion API is the same as the exclusion API
  export type InclusionValidator<T, P> = ExclusionValidator<T, P>;

  export type FormatValidator =
    | RegExp
    | ConstraintOptionsCommon & {
        pattern: string;
        flags?: string;
      };

  export type LengthValidator<T extends keyof Object, P extends String> = {
    is?: number;
    minimum?: number;
    maximum?: number;
    tooShort?: string;
    tokenizer?: (value: T[P]) => T[P][];
  };

  export type NumericalityValidator =
    | boolean
    | ConstraintOptionsCommon & {
        strict?: boolean;
        noStrings?: boolean;
        divisibleBy?: number;
        onlyInteger?: boolean;
        greaterThan?: number;
        greaterThanOrEqualTo?: number;
        equalTo?: number;
        lessThanOrEqualTo?: number;
        lessThan?: number;
        odd?: boolean;
        even?: boolean;
      };

  export type UrlValidator =
    | boolean
    | ConstraintOptionsCommon & {
        schemes?: RegExp | string[];
        allowLocal?: boolean;
      };

  export type ValidateJSValidators<T, P> = {
    email?: EmailValidator;
    presence?: PresenceValidator;
    date?: DateTimeValidator;
    datetime?: DateTimeValidator;
    equality?: EqualityValidator<T, P>;
    exclusion?: ExclusionValidator<T, P>;
    format?: FormatValidator;
    inclusion?: InclusionValidator<T, P>;
    length?: LengthValidator<T, P>;
    numericality?: NumericalityValidator;
    url?: UrlValidator;
  };

  export type ValidateJSConstraints<T> = {
    [P in keyof Partial<T>]: ValidateJSValidators<T, P>
  };

  export interface ValidateJS {
    <TAttributes, TConstraints>(
      attributes: TAttributes,
      constraints: TConstraints,
      options?: ValidateOption
    ): any;
    validate<TAttributes, TConstraints>(
      attributes: TAttributes,
      constraints: TConstraints,
      options?: ValidateOption
    ): any;
    async<TAttributes, TConstraints>(
      attributes: TAttributes,
      constraints: TConstraints,
      options?: AsyncValidateOption
    ): Promise<any>;
    single<TConstraints>(
      value: any,
      constraints: any,
      options?: ValidateOption
    ): any;

    validators: any;
    formatters: any;

    capitalize(value: string): string;
    cleanAttributes(attributes: any, whitelist: any): any;
    collectFormValues(form: any, options?: CollectFormValuesOption): any;
    contains(obj: any, value: any): boolean;
    extend(obj: any, ...otherObjects: any[]): any;
    format(str: string, vals: any): string;
    getDeepObjectValue(obj: any, keypath: string): any;
    isArray(value: any): boolean;
    isBoolean(value: any): boolean;
    isDate(value: any): boolean;
    isDefined(value: any): boolean;
    isDomElement(value: any): boolean;
    isEmpty(value: any): boolean;
    isFunction(value: any): boolean;
    isHash(value: any): boolean;
    isInteger(value: any): boolean;
    isNumber(value: any): boolean;
    isObject(value: any): boolean;
    isPromise(value: any): boolean;
    isString(value: any): boolean;
    prettify(value: string): string;
    result(value: any, ...args: any[]): any;
  }
}

declare const validate: validate.ValidateJS;
export = validate;
