import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsInt, IsNotEmpty } from 'class-validator';
import { IsCyrillic } from 'src/validators/is-cirillic.validator';

export class CreateStationDto {
  @ApiProperty({ example: 'Київ', description: 'Назва станції' })
  @IsString()
  @IsNotEmpty({ message: "Назва станції є обов'язковою" })
  @IsCyrillic()
  @MinLength(3, { message: 'Назва станції має містити щонайменше 3 символи' })
  name: string;

  @ApiProperty({ example: '2200000', description: 'Код станції' })
  @IsNotEmpty({ message: "Код станції є обов'язковим" })
  @IsInt({ message: 'Код станції має бути цілим числом' })
  code: number;
}
