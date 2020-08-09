import { validate } from '../index';

export class BaseDto {
  private dtoObject: any;

  public initDto(dtoObject): void {
    this.dtoObject = dtoObject;
  }

  public validate(): Promise<any> {
    return new Promise((resolve, reject) => {
      validate(this.dtoObject).then(errors => {
        if (errors.length === 0) resolve();
        if (errors.length > 0) reject(errors);
      });
    });
  }

  public validateField(fieldName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      validate(this.dtoObject, {
        propertyName: fieldName,
        stopAtFirstError: true,
      }).then(errors => {
        if (errors.length === 0) resolve();
        if (errors.length > 0) reject(errors);
      });
    });
  }
}
