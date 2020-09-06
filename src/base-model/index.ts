import { validate } from '../index';
import { ValidatorOptions } from '../validation/ValidatorOptions';

export class BaseModel {
  private dtoObject: any;

  constructor(DtoClass: any) {
    this.setDto(DtoClass);
  }

  private setDto(DtoClass: any): void {
    this.dtoObject = new DtoClass();
  }

  public setValue(key: string, value: any): void {
    this.dtoObject[key] = value;
  }

  public getValue(key: string): any {
    return this.dtoObject[key];
  }

  public validate(validatorOptions?: ValidatorOptions): Promise<any> {
    return new Promise(resolve => {
      validatorOptions = Object.assign(
        {
          propertyName: undefined,
          stopAtFirstError: true,
        },
        validatorOptions
      );

      validate(this.dtoObject, validatorOptions).then(errors => {
        if (errors.length === 0) resolve({ isValid: true, validatedData: this.dtoObject, errors: null });
        if (errors.length > 0) resolve({ isValid: false, validatedData: null, errors });
      });
    });
  }

  public validateField(fieldName: string, validatorOptions?: ValidatorOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      validatorOptions = Object.assign(
        {
          propertyName: fieldName,
          stopAtFirstError: true,
        },
        validatorOptions
      );

      validate(this.dtoObject, validatorOptions).then(errors => {
        if (errors.length === 0) resolve(this.dtoObject[fieldName]);
        if (errors.length > 0) reject(errors);
      });
    });
  }
}
