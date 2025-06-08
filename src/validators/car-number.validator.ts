import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsCarNumberValid(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsCarNumberValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;
          return /^\d{2}[ПКЛ]$/.test(value);
        },
        defaultMessage() {
          return `Кожен вагон має містити 2 цифри і одну із букв позначающих його клас (П, К, Л)`;
        },
      },
    });
  };
}
