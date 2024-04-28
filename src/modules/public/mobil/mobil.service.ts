import { Injectable, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// DTO
import { CreateMobilDto, UpdateMobilDto } from './mobil.dto';

// Schema
import { Mobil, MobilDocument } from '@/schemas/mobil/Mobil';
import { InspeksiSchema } from '@/schemas/mobil/inspeksi';
import { MerkMobil } from '@/schemas/mobil/mobil_properties/MerkMobil';
import { JenisMobil } from '@/schemas/mobil/mobil_properties/JenisMobil';
import { TipeMobil } from '@/schemas/mobil/mobil_properties/TipeMobil';

@Injectable()
export class MobilService {
  constructor(
    @InjectModel(Mobil.name) private mobilModel: Model<Mobil>,
    @InjectModel(MerkMobil.name) private merkMobilModel: Model<MerkMobil>,
    @InjectModel(JenisMobil.name) private jenisMobilModel: Model<JenisMobil>,
    @InjectModel(TipeMobil.name) private tipeMobilModel: Model<TipeMobil>,
  ) {}

  async getAll(res: Response) {
    const mobilDatas = await this.mobilModel
      .find({})
      .populate({
        path: 'merk',
        select: ['name'],
        model: this.merkMobilModel,
      })
      .populate({
        path: 'jenis',
        select: ['name'],
        model: this.jenisMobilModel,
      })
      .populate({
        path: 'tipe',
        select: ['name'],
        model: this.tipeMobilModel,
      });

    return res.json({
      message: 'Data Fetched',
      status: '200',
      data: mobilDatas,
    });
  }

  async getOne(res: Response, id: string) {
    const mobilData: MobilDocument | null = await this.mobilModel
      .findOne({
        _id: id,
      })
      .populate({
        path: 'merk',
        select: ['name'],
        model: this.merkMobilModel,
      })
      .populate({
        path: 'jenis',
        select: ['name'],

        model: this.jenisMobilModel,
      })
      .populate({
        path: 'tipe',
        select: ['name'],
        model: this.tipeMobilModel,
      });

    if (!mobilData) {
      throw new NotFoundException('Mobil Does Not Found');
    }

    res.json({
      message: 'Data Fetched',
      status: '200',
      data: mobilData,
    });
  }

  private async checkIsMobilMasterDataExist(
    body: CreateMobilDto | UpdateMobilDto,
    options: {
      checkTipeMobil?: boolean;
      checkJenisMobil?: boolean;
      checkMerkMobil?: boolean;
    } = {
      checkTipeMobil: true,
      checkJenisMobil: true,
      checkMerkMobil: true,
    },
  ) {
    const { merk, jenis, tipe } = body;

    const { checkJenisMobil, checkTipeMobil, checkMerkMobil } = options;

    if (checkMerkMobil) {
      const isMerkMobilExist = await this.merkMobilModel.findById(merk);

      if (!isMerkMobilExist) {
        throw new NotFoundException('Merk Mobil Doesnt Exist');
      }
    }

    if (checkJenisMobil) {
      const isJenisMobilexist = await this.jenisMobilModel.findById(jenis);

      if (!isJenisMobilexist) {
        throw new NotFoundException('Jenis Mobil Doesnt Exist');
      }
    }

    if (checkTipeMobil) {
      const isTipeMobilExist = await this.tipeMobilModel.findById(tipe);

      if (!isTipeMobilExist) {
        throw new NotFoundException('Tipe Mobil Doesnt Exist');
      }
    }
  }

  async createMobil(res: Response, body: CreateMobilDto) {
    const isMobilWithSameNoPolisiExist = await this.mobilModel.findOne({
      no_polisi: body.no_polisi,
    });

    if (isMobilWithSameNoPolisiExist) {
      throw new NotFoundException('Mobil with same No Polisi Already Exist');
    }

    await this.checkIsMobilMasterDataExist(body);

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
      throw new NotFoundException('Mobil Doesnt Exist');
    }

    const { merk, jenis, tipe } = body;

    await this.checkIsMobilMasterDataExist(body, {
      checkJenisMobil: !!jenis,
      checkMerkMobil: !!merk,
      checkTipeMobil: !!tipe,
    });

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
      throw new NotFoundException('Mobil Doesnt Exist');
    }

    await mobilData.deleteOne();

    res.status(204).json({
      message: 'Data Deleted',
      status: '204',
    });
  }
}
