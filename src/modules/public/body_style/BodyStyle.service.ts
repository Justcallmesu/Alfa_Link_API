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

@Injectable()
export class BodyStyleService {
  constructor(
    @InjectModel(BodyStyle.name) private BodyStyleModel: Model<BodyStyle>,
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
    });
  }

  async getOne(res: Response, id: string) {
    const BodyStyleData: BodyStyleDocument | null =
      await this.BodyStyleModel.findOne({
        _id: id,
      });

    if (!BodyStyleData) {
      throw new NotFoundException('Body Style Does Not Found');
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
      throw new ConflictException('Body Style Already Exist');
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
      throw new NotFoundException('Body Style Doesnt Exist');
    }

    const updatedData = await BodyStyleData.updateOne(body);

    res.status(200).json({
      message: 'Data Updated',
      status: '201',
      data: updatedData,
    });
  }

  async deleteMobil(res: Response, id: string) {
    const BodyStyleData: BodyStyleDocument | null =
      await this.BodyStyleModel.findById(id);

    if (!BodyStyleData) {
      throw new NotFoundException('Body Style Doesnt Exist');
    }

    await BodyStyleData.deleteOne();

    res.status(204).json({
      message: 'Data Deleted',
      status: '204',
    });
  }
}
