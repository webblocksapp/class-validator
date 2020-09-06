import { IsNotEmpty } from '../../src/decorator/decorators';
import { Validator } from '../../src/validation/Validator';
import { BaseModel } from '../../src/base-model';

const validator = new Validator();

describe('base dto validation', () => {
  class MyClass {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    text: string;
  }

  class GroupClass {
    @IsNotEmpty({ groups: ['default'] })
    title: string;

    @IsNotEmpty({ groups: ['default', 'only-text'] })
    text: string;
  }

  const model = new BaseModel(MyClass);
  const groupModel = new BaseModel(GroupClass);

  it('should validate one property set with base dto', () => {
    expect.assertions(1);

    return model
      .validateField('text')
      .then(validatedModel => {
        console.log(validatedModel);
      })
      .catch(errors => {
        expect(errors.length).toEqual(1);
      });
  });

  it('should validate all properties with base dto', () => {
    expect.assertions(1);

    return model.validate().then(validationResult => {
      const { isValid, errors } = validationResult;

      if (!isValid) expect(errors.length).toEqual(2);
    });
  });

  it('should validate all properties on default group', () => {
    expect.assertions(1);

    return groupModel.validate({ groups: ['default'] }).then(validationResult => {
      const { isValid, errors } = validationResult;

      if (!isValid) expect(errors.length).toEqual(2);
    });
  });

  it('should validate all properties on only-text group', () => {
    expect.assertions(1);

    return groupModel.validate({ groups: ['only-text'] }).then(validationResult => {
      const { isValid, errors } = validationResult;

      if (!isValid) expect(errors.length).toEqual(1);
    });
  });
});
