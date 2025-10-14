import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceFeeDto } from './create-service-fee.dto';

export class UpdateServiceFeeDto extends PartialType(CreateServiceFeeDto) {}
