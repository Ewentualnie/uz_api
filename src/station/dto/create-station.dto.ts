import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Matches,
  MinLength,
  IsInt,
  IsNotEmpty,
} from 'class-validator';

export class CreateStationDto {
  @ApiProperty({ example: 'Kyiv', description: 'Назва станції' })
  @IsString()
  @IsNotEmpty({ message: "Назва станції є обов'язковою" })
  @MinLength(3, { message: 'Назва станції має містити щонайменше 3 символи' })
  @Matches(/^[А-Яа-яЇїІіЄєҐґ0-9'’\- ]+$/, {
    message:
      'Назва станції має складатись з не менш як 3 символів і може містити лише кириличні літери, цифри, дефіс і апостроф.',
  })
  name: string;

  @ApiProperty({ example: '2200000', description: 'Код станції' })
  @IsNotEmpty({ message: "Код станції є обов'язковим" })
  @IsInt({ message: 'Код станції має бути цілим числом' })
  @Matches(/^22\d{5}$/, {
    message: 'Код станції - це 7-значне число, що починається з 22.',
  })
  code: number;
}
