import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, IsDateString } from 'class-validator';
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

  @ApiProperty({
    example: '2025-06-10T10:00:00Z',
    description: 'Дата',
  })
  @IsNotEmpty()
  @IsDateString()
  departureTime: Date;
}
