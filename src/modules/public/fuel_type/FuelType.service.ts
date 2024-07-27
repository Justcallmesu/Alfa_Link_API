import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// DTO
import {
  CreateFuelTypeDto,
  FuelTypeFilterEnum,
  UpdateFuelTypeDto,
} from './FuelType.dto';

// Schema
import {
  FuelType,
  FuelTypeDocument,
} from '@/schemas/mobil/mobil_properties/FuelType';
import queryConstructor from '@/modules/common/function/queryConstructor';
import { MongoQuery } from '@/modules/common/class/MongoQuery.class';
import { getPagination } from '@/modules/common/function/pagination';
import { Mobil } from '@/schemas/mobil/Mobil';

@Injectable()
export class FuelTypeService {
  constructor(
    @InjectModel(FuelType.name) private fuelTypeModel: Model<FuelType>,
    @InjectModel(Mobil.name) private mobilModel: Model<Mobil>,
  ) {}

  async getAll(res: Response, query: any) {
    const { filter, pagination, select, sort } = queryConstructor(
      query,
      Object.values(FuelTypeFilterEnum),
    );

    const mongoQueryMeta = await new MongoQuery(
      this.fuelTypeModel,
      filter,
      sort,
      select,
      pagination,
    )
      .filter()
      .sort()
      .select()
      .paginate();

    const fuelTypeDatas = await mongoQueryMeta.mongoQuery;

    return res.json({
      message: 'Data Fetched',
      status: '200',
      data: fuelTypeDatas,
      meta: await getPagination(fuelTypeDatas, pagination, this.fuelTypeModel),
    });
  }

  async getOne(res: Response, id: string) {
    const fuelTypeData: FuelTypeDocument | null =
      await this.fuelTypeModel.findOne({
        _id: id,
      });

    if (!fuelTypeData) {
      throw new NotFoundException('Fuel Type Tidak Ditemukan');
    }

    res.json({
      message: 'Data Fetched',
      status: '200',
      data: fuelTypeData,
    });
  }

  async createFuelType(res: Response, body: CreateFuelTypeDto) {
    const isExist = await this.fuelTypeModel.findOne({ name: body.name });

    if (isExist) {
      throw new ConflictException('Fuel Type Sudah Dibuat');
    }

    const fuelTypeData = await this.fuelTypeModel.create(body);

    res.status(201).json({
      message: 'Data Created',
      status: '201',
      data: fuelTypeData,
    });
  }
  async updateMobil(res: Response, id: string, body: UpdateFuelTypeDto) {
    const fuelTypeData: FuelTypeDocument | null =
      await this.fuelTypeModel.findById(id);

    if (!fuelTypeData) {
      throw new NotFoundException('Fuel Type Tidak Ditemukan');
    }

    const updatedData = await fuelTypeData.updateOne(body);

    res.status(200).json({
      message: 'Data Diedit',
      status: '201',
      data: updatedData,
    });
  }

  async deleteMobil(res: Response, id: string) {
    const fuelTypeData: FuelTypeDocument | null =
      await this.fuelTypeModel.findById(id);

    if (!fuelTypeData) {
      throw new NotFoundException('Jenis Bahan Bakar Tidak Ada');
    }

    const isUsed = await this.mobilModel.findOne({
      jenisBahanBakar: id,
    });

    if (isUsed) {
      throw new ConflictException('Jenis Bahan Bakar Sedang Digunakan');
    }

    await fuelTypeData.deleteOne();

    res.status(204).json({
      message: 'Data Dihapus',
      status: '204',
    });
  }
}
