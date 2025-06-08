import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { IsCyrillic } from 'src/validators/is-cirillic.validator';

export class FindTripDto {
  @ApiProperty({ example: 'Київ', description: 'Назва станції' })
  @IsString()
  @IsNotEmpty({ message: "Назва станції є обов'язковою" })
  @IsCyrillic()
  @MinLength(3, { message: 'Назва станції має містити щонайменше 3 символи' })
  departureSt: string;

  @ApiProperty({ example: 'Харків', description: 'Назва станції' })
  @IsString()
  @IsNotEmpty({ message: "Назва станції є обов'язковою" })
  @IsCyrillic()
  @MinLength(3, { message: 'Назва станції має містити щонайменше 3 символи' })
  arrivalSt: string;
}
