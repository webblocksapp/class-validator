import { IsNotEmpty } from '../../src/decorator/decorators';
import { Validator } from '../../src/validation/Validator';

const validator = new Validator();

describe('one property name validation', () => {
  class MyClass {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    text: string;
  }

  it('should validate the property text, set on validator options, and show 1 error', () => {
    expect.assertions(1);

    const model = new MyClass();
    return validator.validate(model, { propertyName: 'text' }).then(errors => {
      expect(errors.length).toEqual(1);
    });
  });

  it('should validate all properties if property name is not set', () => {
    expect.assertions(1);

    const model = new MyClass();
    return validator.validate(model).then(errors => {
      expect(errors.length).toEqual(2);
    });
  });
});
