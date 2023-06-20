import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserRoleDto {
  @ApiProperty({
    required: true,
    example: 'userId',
    description: 'The userId of the UserRole',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    required: true,
    example: 'role',
    description: 'The role of the UserRole',
  })
  @IsString()
  role: string;
}
