import { IsString, Matches, MinLength, IsInt } from 'class-validator';

export class CreateStationDto {
  @IsString()
  @MinLength(3, { message: 'Назва станції має містити щонайменше 3 символи' })
  @Matches(/^[А-Яа-яЇїІіЄєҐґ0-9'’\- ]+$/, {
    message:
      'Назва станції має складатись з не менш як 3 символів і може містити лише кириличні літери, цифри, дефіс і апостроф.',
  })
  name: string;

  @IsInt({ message: 'Код станції має бути цілим числом' })
  @Matches(/^22\d{5}$/, {
    message: 'Код станції - це 7-значне число, що починається з 22.',
  })
  code: number;
}
