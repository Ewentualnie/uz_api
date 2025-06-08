import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsTrainNumberValid(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsTrainNumberValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;
          return /^\d{3}[А-ЩЬЮЯЄІЇҐ]$/.test(value);
        },
        defaultMessage() {
          return `Номер поїзда має містити три цифри і букву кирилицею`;
        },
      },
    });
  };
}
