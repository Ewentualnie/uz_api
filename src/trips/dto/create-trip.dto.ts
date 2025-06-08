import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsNotEmpty, MinLength } from 'class-validator';
import { IsCyrillic } from 'src/validators/is-cirillic.validator';

export class CreateTripDto {
  @ApiProperty({ example: '000К', description: 'Номер поїзда' })
  @IsString()
  @IsNotEmpty()
  train: string;

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

  @ApiProperty({
    example: '2025-06-10T10:00:00Z',
    description: 'Дата виїзду',
  })
  @IsNotEmpty({ message: "Дата виїзду є обов'язковою" })
  @IsDateString()
  departureDate: string;

  @ApiProperty({
    example: '2025-06-10T15:00:00Z',
    description: 'Дата прибуття',
  })
  @IsNotEmpty({ message: "Дата прибуття є обов'язковою" })
  @IsDateString()
  arrivalDate: string;
}
