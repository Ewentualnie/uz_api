import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ArrayMinSize, IsNotEmpty } from 'class-validator';
import { IsTrainNumberValid } from 'src/validators/train-number.validator';
import { IsCarNumberValid } from 'src/validators/car-number.validator';

export class CreateTrainDto {
  @ApiProperty({ example: '000К', description: 'Номер поїзда' })
  @IsString()
  @IsNotEmpty({ message: 'Номер поїзда не може бути порожнім' })
  @IsTrainNumberValid()
  number: string;

  @ApiProperty({
    example: ['01К', '02П', '03Л'],
    description: 'Список вагонів поїзда',
    type: [String],
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'Поїзд повинен мати щонайменше один вагон' })
  @IsString({ each: true })
  @IsCarNumberValid({ each: true })
  cars: string[];
}
