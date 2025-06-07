import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsCyrillic(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isCyrillic',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;
          return /^[А-ЩЬЮЯЄІЇҐа-щьюяєіїґ0-9ʼ’'\- ]+$/.test(value);
        },
        defaultMessage() {
          return `Назва станції може містити лише кириличні літери, цифри, дефіс і апостроф.`;
        },
      },
    });
  };
}
