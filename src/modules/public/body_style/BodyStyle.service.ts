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
  BodyStyleFilterEnum,
  CreateBodyStyleDto,
  UpdateBodyStyleDto,
} from './BodyStyle.dto';

// Schema
import {
  BodyStyle,
  BodyStyleDocument,
} from '@/schemas/mobil/mobil_properties/BodyStyle';
import queryConstructor from '@/modules/common/function/queryConstructor';
import { MongoQuery } from '@/modules/common/class/MongoQuery.class';
import { getPagination } from '@/modules/common/function/pagination';
import { Mobil } from '@/schemas/mobil/Mobil';

@Injectable()
export class BodyStyleService {
  constructor(
    @InjectModel(BodyStyle.name) private BodyStyleModel: Model<BodyStyle>,
    @InjectModel(Mobil.name) private mobilModel: Model<Mobil>,
  ) {}

  async getAll(res: Response, query: any) {
    const { filter, pagination, select, sort } = queryConstructor(
      query,
      Object.values(BodyStyleFilterEnum),
    );

    const mongoQueryMeta = await new MongoQuery(
      this.BodyStyleModel,
      filter,
      sort,
      select,
      pagination,
    )
      .filter()
      .sort()
      .select()
      .paginate();

    const BodyStyleDatas = await mongoQueryMeta.mongoQuery;

    return res.json({
      message: 'Data Fetched',
      status: '200',
      data: BodyStyleDatas,
      meta: await getPagination(
        BodyStyleDatas,
        pagination,
        this.BodyStyleModel,
      ),
    });
  }

  async getOne(res: Response, id: string) {
    const BodyStyleData: BodyStyleDocument | null =
      await this.BodyStyleModel.findOne({
        _id: id,
      });

    if (!BodyStyleData) {
      throw new NotFoundException('Body Style Tidak Ditemukan');
    }

    res.json({
      message: 'Data Fetched',
      status: '200',
      data: BodyStyleData,
    });
  }

  async createMobil(res: Response, body: CreateBodyStyleDto) {
    const isExist = await this.BodyStyleModel.findOne({ name: body.name });

    if (isExist) {
      throw new ConflictException('Body Style Sudah Dibuat');
    }

    const BodyStyleData = await this.BodyStyleModel.create(body);

    res.status(201).json({
      message: 'Data Created',
      status: '201',
      data: BodyStyleData,
    });
  }

  async updateMobil(res: Response, id: string, body: UpdateBodyStyleDto) {
    const BodyStyleData: BodyStyleDocument | null =
      await this.BodyStyleModel.findById(id);

    if (!BodyStyleData) {
      throw new NotFoundException('Body Style Tidak Ditemukan');
    }

    const updatedData = await BodyStyleData.updateOne(body);

    res.status(200).json({
      message: 'Data Diedit',
      status: '201',
      data: updatedData,
    });
  }

  async deleteMobil(res: Response, id: string) {
    const BodyStyleData: BodyStyleDocument | null =
      await this.BodyStyleModel.findById(id);

    if (!BodyStyleData) {
      throw new NotFoundException('Body Style Tidak Ada');
    }

    const isUsed = await this.mobilModel.findOne({
      bodyStyle: id,
    });

    if (isUsed) {
      throw new ConflictException('Body Style Sedang Digunakan');
    }

    await BodyStyleData.deleteOne();

    res.status(204).json({
      message: 'Data Dihapus',
      status: '204',
    });
  }
}
