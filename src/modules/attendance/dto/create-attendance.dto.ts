import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt } from 'class-validator';

export class CreateAttendanceDto {
  @ApiProperty({
    required: true,
    example: 'employeeId',
    description: 'The employeeId of the Attendance',
  })
  @IsString()
  employeeId: string;

  @ApiProperty({
    required: true,
    description: 'The checkin of the Attendance',
  })
  @IsInt()
  checkin: bigint;

  @ApiProperty({
    required: true,
    description: 'The checkout of the Attendance',
  })
  @IsInt()
  checkout: bigint;

  @ApiProperty({
    required: true,
    example: 'recordTypeId',
    description: 'The recordTypeId of the Attendance',
  })
  @IsString()
  recordTypeId: string;

  @ApiProperty({
    required: false,
    example: 'taskId',
    description: 'The taskId of the Attendance',
  })
  @IsOptional()
  @IsString()
  taskId?: string;
}
