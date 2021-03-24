import { IsNotEmpty, ValidateNested, IsDefined } from '../../src/decorator/decorators';
import { Validator } from '../../src/validation/Validator';

const validator = new Validator();

describe('nested one property name validation', () => {
  it('should validate the property child, set on validator options, and show 1 errors', () => {
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

    expect.assertions(1);

    const model = new MyClass();
    model.mySubClass = new MySubClass();

    return validator.validate(model, { propertyName: 'mySubClass.name' }).then(errors => {
      expect(errors.length).toEqual(1);
    });
  });

  it('should validate the property grandchild, set on validator options, and show 1 errors', () => {
    class MyGrandChildClass {
      @IsNotEmpty()
      address: string;
    }
    
    class MySubClass {
      @IsNotEmpty()
      name: string;

      @ValidateNested()
      @IsDefined()
      myGrandChildClass: MyGrandChildClass;
    }
  
    class MyClass {
      @IsNotEmpty()
      title: string;
  
      @ValidateNested()
      @IsDefined()
      mySubClass: MySubClass;
    }

    expect.assertions(1);

    const model = new MyClass();
    model.mySubClass = new MySubClass();
    model.mySubClass.myGrandChildClass = new MyGrandChildClass();

    return validator.validate(model, { propertyName: 'mySubClass.myGrandChildClass.address' }).then(errors => {
      expect(errors.length).toEqual(1);
    });
  });
});
