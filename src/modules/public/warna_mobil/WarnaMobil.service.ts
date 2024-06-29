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

@Injectable()
export class WarnaMobilService {
  constructor(
    @InjectModel(WarnaMobil.name) private warnaMobilModel: Model<WarnaMobil>,
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
      meta: await getPagination(warnaMobilDatas, pagination),
    });
  }

  async getOne(res: Response, id: string) {
    const warnaMobilData: WarnaMobilDocument | null =
      await this.warnaMobilModel.findOne({
        _id: id,
      });

    if (!warnaMobilData) {
      throw new NotFoundException('Warna Mobil Does Not Found');
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
      throw new ConflictException('Warna Mobil Already Exist');
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
      throw new NotFoundException('Warna Mobil Doesnt Exist');
    }

    const updatedData = await warnaMobilData.updateOne(body);

    res.status(200).json({
      message: 'Data Updated',
      status: '201',
      data: updatedData,
    });
  }

  async deleteMobil(res: Response, id: string) {
    const warnaMobilData: WarnaMobilDocument | null =
      await this.warnaMobilModel.findById(id);

    if (!warnaMobilData) {
      throw new NotFoundException('Warna Mobil Doesnt Exist');
    }

    await warnaMobilData.deleteOne();

    res.status(204).json({
      message: 'Data Deleted',
      status: '204',
    });
  }
}
