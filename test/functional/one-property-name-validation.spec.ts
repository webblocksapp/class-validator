import { IsNotEmpty } from '../../src/decorator/decorators';
import { Validator } from '../../src/validation/Validator';

const validator = new Validator();

describe('one property name validation', () => {
  it('should validate the property text, set on validator options, and show 1 error', () => {
    expect.assertions(1);

    class MyClass {
      @IsNotEmpty()
      title: string;

      @IsNotEmpty()
      text: string;
    }

    const model = new MyClass();
    return validator.validate(model, { propertyName: 'text' }).then(errors => {
      expect(errors.length).toEqual(1);
    });
  });
});
