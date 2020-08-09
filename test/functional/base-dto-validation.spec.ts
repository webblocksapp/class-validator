import { IsNotEmpty } from '../../src/decorator/decorators';
import { Validator } from '../../src/validation/Validator';
import { BaseDto } from '../../src/base-dto';

const validator = new Validator();

describe('base dto validation', () => {
  class MyClass extends BaseDto {
    constructor() {
      super();
      this.initDto(this);
    }

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    text: string;
  }

  it('should validate one property set with base dto', () => {
    expect.assertions(1);

    const model = new MyClass();
    return model
      .validateField('text')
      .then(() => {
        console.log('Validation without errors');
      })
      .catch(errors => {
        expect(errors.length).toEqual(1);
      });
  });

  it('should validate all properties with base dto', () => {
    expect.assertions(1);

    const model = new MyClass();
    return model
      .validate()
      .then(() => {
        console.log('Validation without errors');
      })
      .catch(errors => {
        expect(errors.length).toEqual(2);
      });
  });
});
