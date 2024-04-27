import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// DTO
import { CreateMobilDto, UpdateMobilDto } from './mobil.dto';

// Schema
import { Mobil, MobilDocument } from '@/schemas/mobil/Mobil';

@Injectable()
export class MobilService {
  constructor(@InjectModel(Mobil.name) private mobilModel: Model<Mobil>) {}

  async getAll(res: Response) {
    const mobilDatas = await this.mobilModel.find({});

    return res.json({
      message: 'Data Fetched',
      status: '200',
      data: mobilDatas,
    });
  }

  async getOne(res: Response, id: string) {
    const mobilData: MobilDocument | null = await this.mobilModel.findOne({
      _id: id,
    });

    if (!mobilData) {
      throw new NotFoundException('Customer Does Not Found');
    }

    res.json({
      message: 'Data Fetched',
      status: '200',
      data: mobilData,
    });
  }

  async createMobil(res: Response, body: CreateMobilDto) {
    const mobilData = await this.mobilModel.create(body);

    res.status(201).json({
      message: 'Data Created',
      status: '201',
      data: mobilData,
    });
  }

  async updateMobil(res: Response, id: string, body: UpdateMobilDto) {
    const mobilData: MobilDocument | null = await this.mobilModel.findById(id);

    if (!mobilData) {
      throw new NotFoundException('Customer Doesnt Exist');
    }

    await mobilData.updateOne(body);

    res.status(200).json({
      message: 'Data Updated',
      status: '201',
      data: mobilData,
    });
  }

  async deleteMobil(res: Response, id: string) {
    const mobilData: MobilDocument | null = await this.mobilModel.findById(id);

    if (!mobilData) {
      throw new NotFoundException('Customer Doesnt Exist');
    }

    await mobilData.deleteOne();

    res.status(204).json({
      message: 'Data Deleted',
      status: '204',
    });
  }
}
