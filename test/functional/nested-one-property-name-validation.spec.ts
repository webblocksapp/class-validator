import { IsNotEmpty, ValidateNested, IsDefined } from '../../src/decorator/decorators';
import { Validator } from '../../src/validation/Validator';

const validator = new Validator();

describe('nested one property name validation', () => {
  class MySubClass {
    @IsNotEmpty()
    name: string;
  }

  class MyClass {
    @IsNotEmpty()
    title: string;

    @ValidateNested()
    @IsDefined()
    mySubClass: MySubClass;
  }

  it('should validate the property child, set on validator options, and show 1 errors', () => {
    expect.assertions(1);

    const model = new MyClass();
    model.mySubClass = new MySubClass();

    return validator.validate(model, { propertyName: 'mySubClass.name' }).then(errors => {
      expect(errors.length).toEqual(1);
    });
  });
});
