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
  CreateWarnaMobilDto,
  UpdateWarnaMobilDto,
  WarnaMobilFilterEnum,
} from './WarnaMobil.dto';

// Schema
import {
  WarnaMobil,
  WarnaMobilDocument,
} from '@/schemas/mobil/mobil_properties/WarnaMobil';
import queryConstructor from '@/modules/common/function/queryConstructor';
import { MongoQuery } from '@/modules/common/class/MongoQuery.class';
import { getPagination } from '@/modules/common/function/pagination';
import { Mobil } from '@/schemas/mobil/Mobil';

@Injectable()
export class WarnaMobilService {
  constructor(
    @InjectModel(WarnaMobil.name) private warnaMobilModel: Model<WarnaMobil>,
    @InjectModel(Mobil.name) private mobilModel: Model<Mobil>,
  ) {}

  async getAll(res: Response, query: any) {
    const { filter, pagination, select, sort } = queryConstructor(
      query,
      Object.values(WarnaMobilFilterEnum),
    );

    const mongoQueryMeta = await new MongoQuery(
      this.warnaMobilModel,
      filter,
      sort,
      select,
      pagination,
    )
      .filter()
      .sort()
      .select()
      .paginate();

    const warnaMobilDatas = await mongoQueryMeta.mongoQuery;

    return res.json({
      message: 'Data Fetched',
      status: '200',
      data: warnaMobilDatas,
      meta: await getPagination(
        warnaMobilDatas,
        pagination,
        this.warnaMobilModel,
      ),
    });
  }

  async getOne(res: Response, id: string) {
    const warnaMobilData: WarnaMobilDocument | null =
      await this.warnaMobilModel.findOne({
        _id: id,
      });

    if (!warnaMobilData) {
      throw new NotFoundException('Warna Mobil Tidak Ditemukan');
    }

    res.json({
      message: 'Data Fetched',
      status: '200',
      data: warnaMobilData,
    });
  }

  async createWarnaMobil(res: Response, body: CreateWarnaMobilDto) {
    const isExist = await this.warnaMobilModel.findOne({ name: body.name });

    if (isExist) {
      throw new ConflictException('Warna Mobil Sudah Dibuat');
    }

    const warnaMobilData = await this.warnaMobilModel.create(body);

    res.status(201).json({
      message: 'Data Created',
      status: '201',
      data: warnaMobilData,
    });
  }
  async updateMobil(res: Response, id: string, body: UpdateWarnaMobilDto) {
    const warnaMobilData: WarnaMobilDocument | null =
      await this.warnaMobilModel.findById(id);

    if (!warnaMobilData) {
      throw new NotFoundException('Warna Mobil Tidak Ditemukan');
    }

    const updatedData = await warnaMobilData.updateOne(body);

    res.status(200).json({
      message: 'Data Diedit',
      status: '201',
      data: updatedData,
    });
  }

  async deleteMobil(res: Response, id: string) {
    const warnaMobilData: WarnaMobilDocument | null =
      await this.warnaMobilModel.findById(id);

    if (!warnaMobilData) {
      throw new NotFoundException('Warna Mobil Tidak Ditemukan');
    }

    const isUsed = await this.mobilModel.findOne({
      jenisBahanBakar: id,
    });

    if (isUsed) {
      throw new ConflictException('Warna Mobil Sedang Digunakan');
    }

    await warnaMobilData.deleteOne();

    res.status(204).json({
      message: 'Data Dihapus',
      status: '204',
    });
  }
}
