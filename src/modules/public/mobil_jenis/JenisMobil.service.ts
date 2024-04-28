import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// DTO
import { CreateJenisMobilDto, UpdateJenisMobilDto } from './JenisMobil.dto';

// Schema
import {
  JenisMobil,
  JenisMobilDocument,
} from '@/schemas/mobil/mobil_properties/JenisMobil';

@Injectable()
export class JenisMobilService {
  constructor(
    @InjectModel(JenisMobil.name) private jenisMobilModel: Model<JenisMobil>,
  ) {}

  async getAll(res: Response) {
    const jenisMobilDatas = await this.jenisMobilModel.find({});

    return res.json({
      message: 'Data Fetched',
      status: '200',
      data: jenisMobilDatas,
    });
  }

  async getOne(res: Response, id: string) {
    const jenisMobilData: JenisMobilDocument | null =
      await this.jenisMobilModel.findOne({
        _id: id,
      });

    if (!jenisMobilData) {
      throw new NotFoundException('Jenis Mobil Does Not Found');
    }

    res.json({
      message: 'Data Fetched',
      status: '200',
      data: jenisMobilData,
    });
  }

  async createMobil(res: Response, body: CreateJenisMobilDto) {
    const isExist = await this.jenisMobilModel.findOne({ name: body.name });

    if (isExist) {
      throw new ConflictException('Jenis Mobil Already Exist');
    }

    const jenisMobilData = await this.jenisMobilModel.create(body);

    res.status(201).json({
      message: 'Data Created',
      status: '201',
      data: jenisMobilData,
    });
  }

  async updateMobil(res: Response, id: string, body: UpdateJenisMobilDto) {
    const jenisMobilData: JenisMobilDocument | null =
      await this.jenisMobilModel.findById(id);

    if (!jenisMobilData) {
      throw new NotFoundException('Jenis Mobil Doesnt Exist');
    }

    const updatedData = await jenisMobilData.updateOne(body);

    res.status(200).json({
      message: 'Data Updated',
      status: '201',
      data: updatedData,
    });
  }

  async deleteMobil(res: Response, id: string) {
    const jenisMobilData: JenisMobilDocument | null =
      await this.jenisMobilModel.findById(id);

    if (!jenisMobilData) {
      throw new NotFoundException('Jenis Mobil Doesnt Exist');
    }

    await jenisMobilData.deleteOne();

    res.status(204).json({
      message: 'Data Deleted',
      status: '204',
    });
  }
}
