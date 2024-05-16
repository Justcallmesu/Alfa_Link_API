import { Global, Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

// Module
import { PublicModule } from '../public/public.module';

/**
 * Schema
 */
import {
  PenjualanCustomer,
  PenjualanCustomerSchema,
} from '@/schemas/Penjualan/PenjualanCustomer';
import { User, UserSchema } from '@/schemas/auth/User';
import { Roles, RolesSchema } from '@/schemas/auth/Roles';
import { Permissions, PermissionsSchema } from '@/schemas/auth/Permissions';
import { Customer, CustomerSchema } from '@/schemas/customer/Customer';
import { Mobil, MobilSchema } from '@/schemas/mobil/Mobil';
import {
  BodyStyle,
  BodyStyleSchema,
} from '@/schemas/mobil/mobil_properties/BodyStyle';
import {
  MerkMobil,
  MerkMobilSchema,
} from '@/schemas/mobil/mobil_properties/MerkMobil';
import {
  TipeMobil,
  TipeMobilSchema,
} from '@/schemas/mobil/mobil_properties/TipeMobil';
import { Penjualan, PenjualanSchema } from '@/schemas/Penjualan/Penjualan';
import { BankTujuan, BankTujuanSchema } from '@/schemas/BankTujuan/BankTujuan';
import {
  WarnaMobil,
  WarnaMobilSchema,
} from '@/schemas/mobil/mobil_properties/WarnaMobil';
import {
  FuelType,
  FuelTypeSchema,
} from '@/schemas/mobil/mobil_properties/FuelType';
import {
  ModelMobil,
  ModelMobilSchema,
} from '@/schemas/mobil/mobil_properties/Model';
import { Inspeksi, InspeksiSchema } from '@/schemas/mobil/inspeksi';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL as string, {
      dbName: process.env.MONGODB_DB as string,
      appName: 'alfa-link-api',
    }),

    /**
     * Mongoose Model
     */
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Roles.name, schema: RolesSchema },
      { name: Permissions.name, schema: PermissionsSchema },
      { name: PenjualanCustomer.name, schema: PenjualanCustomerSchema },
      { name: Customer.name, schema: CustomerSchema },
      { name: Mobil.name, schema: MobilSchema },
      { name: BodyStyle.name, schema: BodyStyleSchema },
      { name: MerkMobil.name, schema: MerkMobilSchema },
      { name: TipeMobil.name, schema: TipeMobilSchema },
      { name: Penjualan.name, schema: PenjualanSchema },
      { name: BankTujuan.name, schema: BankTujuanSchema },
      { name: WarnaMobil.name, schema: WarnaMobilSchema },
      { name: FuelType.name, schema: FuelTypeSchema },
      { name: ModelMobil.name, schema: ModelMobilSchema },
      { name: Inspeksi.name, schema: InspeksiSchema },
    ]),

    /**
     * Public
     */
    PublicModule,
  ],
  controllers: [],
  providers: [],
  exports: [
    /**
     * Export Mongoose Model
     */
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Roles.name, schema: RolesSchema },
      { name: Permissions.name, schema: PermissionsSchema },
      { name: PenjualanCustomer.name, schema: PenjualanCustomerSchema },
      { name: Customer.name, schema: CustomerSchema },
      { name: Mobil.name, schema: MobilSchema },
      { name: BodyStyle.name, schema: BodyStyleSchema },
      { name: MerkMobil.name, schema: MerkMobilSchema },
      { name: TipeMobil.name, schema: TipeMobilSchema },
      { name: Penjualan.name, schema: PenjualanSchema },
      { name: BankTujuan.name, schema: BankTujuanSchema },
      { name: WarnaMobil.name, schema: WarnaMobilSchema },
      { name: FuelType.name, schema: FuelTypeSchema },
      { name: ModelMobil.name, schema: ModelMobilSchema },
      { name: Inspeksi.name, schema: InspeksiSchema },
    ]),
  ],
})
export class AppModule {}
