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
  CreateTipeMobilDto,
  TipeMobilFilterEnum,
  UpdateTipeMobilDto,
} from './TipeMobil.dto';

// Schema
import {
  TipeMobil,
  TipeMobilDocument,
} from '@/schemas/mobil/mobil_properties/TipeMobil';
import { MongoQuery } from '@/modules/common/class/MongoQuery.class';
import queryConstructor from '@/modules/common/function/queryConstructor';
import { getPagination } from '@/modules/common/function/pagination';
import { Mobil } from '@/schemas/mobil/Mobil';

@Injectable()
export class TipeMobilservice {
  constructor(
    @InjectModel(TipeMobil.name) private tipeMobilModel: Model<TipeMobil>,
    @InjectModel(Mobil.name) private mobilModel: Model<Mobil>,
  ) {}

  async getAll(res: Response, query: any) {
    const { filter, pagination, select, sort } = queryConstructor(
      query,
      Object.values(TipeMobilFilterEnum),
    );

    const mongoQueryMeta = await new MongoQuery(
      this.tipeMobilModel,
      filter,
      sort,
      select,
      pagination,
    )
      .filter()
      .sort()
      .select()
      .paginate();

    const tipeMobilDatas = await mongoQueryMeta.mongoQuery;

    return res.json({
      message: 'Data Fetched',
      status: '200',
      data: tipeMobilDatas,
      meta: await getPagination(
        tipeMobilDatas,
        pagination,
        this.tipeMobilModel,
      ),
    });
  }

  async getOne(res: Response, id: string) {
    const tipeMobilData: TipeMobilDocument | null =
      await this.tipeMobilModel.findOne({
        _id: id,
      });

    if (!tipeMobilData) {
      throw new NotFoundException('Tipe Mobil Tidak Ditemukan');
    }

    res.json({
      message: 'Data Fetched',
      status: '200',
      data: tipeMobilData,
    });
  }

  async createMobil(res: Response, body: CreateTipeMobilDto) {
    const isExist = await this.tipeMobilModel.findOne({ name: body.name });

    if (isExist) {
      throw new ConflictException('Tipe Mobil Sudah Dibuat');
    }

    const tipeMobilData = await this.tipeMobilModel.create(body);

    res.status(201).json({
      message: 'Data Created',
      status: '201',
      data: tipeMobilData,
    });
  }
  async updateMobil(res: Response, id: string, body: UpdateTipeMobilDto) {
    const tipeMobilData: TipeMobilDocument | null =
      await this.tipeMobilModel.findById(id);

    if (!tipeMobilData) {
      throw new NotFoundException('Tipe Mobil Tidak Ditemukan');
    }

    const updatedData = await tipeMobilData.updateOne(body);

    res.status(200).json({
      message: 'Data Diedit',
      status: '201',
      data: updatedData,
    });
  }

  async deleteMobil(res: Response, id: string) {
    const tipeMobilData: TipeMobilDocument | null =
      await this.tipeMobilModel.findById(id);

    if (!tipeMobilData) {
      throw new NotFoundException('Tipe Mobil Tidak Ditemukan');
    }

    const isUsed = await this.mobilModel.findOne({
      tipe: id,
    });

    if (isUsed) {
      throw new ConflictException('Tipe Mobil Sedang Digunakan');
    }

    await tipeMobilData.deleteOne();

    res.status(204).json({
      message: 'Data Dihapus',
      status: '204',
    });
  }
}
