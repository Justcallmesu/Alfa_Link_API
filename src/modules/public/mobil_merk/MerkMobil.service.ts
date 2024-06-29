import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// DTO

// Schema
import {
  MerkMobil,
  MerkMobilDocument,
} from '@/schemas/mobil/mobil_properties/MerkMobil';
import {
  CreateMerkMobilDto,
  MerkMobilFilterEnum,
  UpdateMerkMobilDto,
} from './MerkMobil.dto';
import { MongoQuery } from '@/modules/common/class/MongoQuery.class';
import queryConstructor from '@/modules/common/function/queryConstructor';
import { getPagination } from '@/modules/common/function/pagination';

@Injectable()
export class MerkMobilService {
  constructor(
    @InjectModel(MerkMobil.name) private merkMobilModel: Model<MerkMobil>,
  ) {}

  async getAll(res: Response, query: any) {
    const { filter, pagination, select, sort } = queryConstructor(
      query,
      Object.values(MerkMobilFilterEnum),
    );

    const mongoQueryMeta = await new MongoQuery(
      this.merkMobilModel,
      filter,
      sort,
      select,
      pagination,
    )
      .filter()
      .sort()
      .select()
      .paginate();

    const merkMobilDatas = await mongoQueryMeta.mongoQuery;

    return res.json({
      message: 'Data Fetched',
      status: '200',
      data: merkMobilDatas,
      meta: await getPagination(merkMobilDatas, pagination),
    });
  }

  async getOne(res: Response, id: string) {
    const merkMobilData: MerkMobilDocument | null =
      await this.merkMobilModel.findOne({
        _id: id,
      });

    if (!merkMobilData) {
      throw new NotFoundException('Body Style Does Not Found');
    }

    res.json({
      message: 'Data Fetched',
      status: '200',
      data: merkMobilData,
    });
  }

  async createMobil(res: Response, body: CreateMerkMobilDto) {
    const isExist = await this.merkMobilModel.findOne({ name: body.name });

    if (isExist) {
      throw new ConflictException('Body Style Already Exist');
    }

    const merkMobilData = await this.merkMobilModel.create(body);

    res.status(201).json({
      message: 'Data Created',
      status: '201',
      data: merkMobilData,
    });
  }

  async updateMobil(res: Response, id: string, body: UpdateMerkMobilDto) {
    const merkMobilData: MerkMobilDocument | null =
      await this.merkMobilModel.findById(id);

    if (!merkMobilData) {
      throw new NotFoundException('Body Style Doesnt Exist');
    }

    const updatedData = await merkMobilData.updateOne(body);

    res.status(200).json({
      message: 'Data Updated',
      status: '201',
      data: updatedData,
    });
  }

  async deleteMobil(res: Response, id: string) {
    const merkMobilData: MerkMobilDocument | null =
      await this.merkMobilModel.findById(id);

    if (!merkMobilData) {
      throw new NotFoundException('Body Style Doesnt Exist');
    }

    await merkMobilData.deleteOne();

    res.status(204).json({
      message: 'Data Deleted',
      status: '204',
    });
  }
}
