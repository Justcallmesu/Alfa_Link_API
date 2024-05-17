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
  CreateModelMobilDto,
  ModelMobilFilterEnum,
  UpdateModelMobilDto,
} from './ModelMobil.dto';

// Schema
import {
  ModelMobil,
  ModelMobilDocument,
} from '@/schemas/mobil/mobil_properties/Model';
import queryConstructor from '@/modules/common/function/queryConstructor';
import { MongoQuery } from '@/modules/common/class/MongoQuery.class';

@Injectable()
export class ModelMobilService {
  constructor(
    @InjectModel(ModelMobil.name) private modelMobilModel: Model<ModelMobil>,
  ) {}

  async getAll(res: Response, query: any) {
    const { filter, pagination, select, sort } = queryConstructor(
      query,
      Object.values(ModelMobilFilterEnum),
    );

    const mongoQueryMeta = await new MongoQuery(
      this.modelMobilModel,
      filter,
      sort,
      select,
      pagination,
    )
      .filter()
      .sort()
      .select()
      .paginate();

    const modelMobilDatas = await mongoQueryMeta.mongoQuery;

    return res.json({
      message: 'Data Fetched',
      status: '200',
      data: modelMobilDatas,
    });
  }

  async getOne(res: Response, id: string) {
    const modelMobilData: ModelMobilDocument | null =
      await this.modelMobilModel.findOne({
        _id: id,
      });

    if (!modelMobilData) {
      throw new NotFoundException('Model Mobil Does Not Found');
    }

    res.json({
      message: 'Data Fetched',
      status: '200',
      data: modelMobilData,
    });
  }

  async createModelMobil(res: Response, body: CreateModelMobilDto) {
    const isExist = await this.modelMobilModel.findOne({ name: body.name });

    if (isExist) {
      throw new ConflictException('Model Mobil Already Exist');
    }

    const modelMobilData = await this.modelMobilModel.create(body);

    res.status(201).json({
      message: 'Data Created',
      status: '201',
      data: modelMobilData,
    });
  }
  async updateMobil(res: Response, id: string, body: UpdateModelMobilDto) {
    const modelMobilData: ModelMobilDocument | null =
      await this.modelMobilModel.findById(id);

    if (!modelMobilData) {
      throw new NotFoundException('Model Mobil Doesnt Exist');
    }

    const updatedData = await modelMobilData.updateOne(body);

    res.status(200).json({
      message: 'Data Updated',
      status: '201',
      data: updatedData,
    });
  }

  async deleteMobil(res: Response, id: string) {
    const modelMobilData: ModelMobilDocument | null =
      await this.modelMobilModel.findById(id);

    if (!modelMobilData) {
      throw new NotFoundException('Model Mobil Doesnt Exist');
    }

    await modelMobilData.deleteOne();

    res.status(204).json({
      message: 'Data Deleted',
      status: '204',
    });
  }
}
