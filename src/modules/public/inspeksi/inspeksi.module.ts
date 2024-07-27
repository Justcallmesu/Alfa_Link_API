import { Module } from '@nestjs/common';
import { InspeksiController } from './inspeksi.controller';
import { InspeksiService } from './inspeksi.service';

@Module({
  controllers: [InspeksiController],
  providers: [InspeksiService],
})
export class InspeksiModule {}
