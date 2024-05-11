import { Injectable, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// DTO
import { CreateMobilDto, UpdateMobilDto } from './mobil.dto';

// Schema
import { Mobil, MobilDocument } from '@/schemas/mobil/Mobil';
import { MerkMobil } from '@/schemas/mobil/mobil_properties/MerkMobil';
import { BodyStyle } from '@/schemas/mobil/mobil_properties/BodyStyle';
import { TipeMobil } from '@/schemas/mobil/mobil_properties/TipeMobil';
import { WarnaMobil } from '@/schemas/mobil/mobil_properties/WarnaMobil';
import { FuelType } from '@/schemas/mobil/mobil_properties/FuelType';

@Injectable()
export class MobilService {
  constructor(
    @InjectModel(Mobil.name) private mobilModel: Model<Mobil>,
    @InjectModel(MerkMobil.name) private merkMobilModel: Model<MerkMobil>,
    @InjectModel(BodyStyle.name) private bodyStyleModel: Model<BodyStyle>,
    @InjectModel(TipeMobil.name) private tipeMobilModel: Model<TipeMobil>,
    @InjectModel(WarnaMobil.name) private warnaMobilModel: Model<WarnaMobil>,
    @InjectModel(FuelType.name) private FuelTypeModel: Model<FuelType>,
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
        path: 'bodyStyle',
        select: ['name'],
        model: this.bodyStyleModel,
      })
      .populate({
        path: 'tipe',
        select: ['name'],
        model: this.tipeMobilModel,
      })
      .populate({
        path: 'warnaExterior',
        select: ['name'],
        model: this.warnaMobilModel,
      })
      .populate({
        path: 'warnaInterior',
        select: ['name'],
        model: this.warnaMobilModel,
      })
      .populate({
        path: 'jenisBahanBakar',
        select: ['name'],
        model: this.FuelTypeModel,
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
        path: 'bodyStyle',
        select: ['name'],
        model: this.bodyStyleModel,
      })
      .populate({
        path: 'tipe',
        select: ['name'],
        model: this.tipeMobilModel,
      })
      .populate({
        path: 'warnaExterior',
        select: ['name'],
        model: this.warnaMobilModel,
      })
      .populate({
        path: 'warnaInterior',
        select: ['name'],
        model: this.warnaMobilModel,
      })
      .populate({
        path: 'jenisBahanBakar',
        select: ['name'],
        model: this.FuelTypeModel,
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
      checkBodyStyle?: boolean;
      checkMerkMobil?: boolean;
    } = {
      checkTipeMobil: true,
      checkBodyStyle: true,
      checkMerkMobil: true,
    },
  ) {
    const { merk, bodyStyle, tipe } = body;

    const { checkBodyStyle, checkTipeMobil, checkMerkMobil } = options;

    if (checkMerkMobil) {
      const isMerkMobilExist = await this.merkMobilModel.findById(merk);

      if (!isMerkMobilExist) {
        throw new NotFoundException('Merk Mobil Doesnt Exist');
      }
    }

    if (checkBodyStyle) {
      const isBodyStyleExist = await this.bodyStyleModel.findById(bodyStyle);

      if (!isBodyStyleExist) {
        throw new NotFoundException('Body Style Doesnt Exist');
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
      no_polisi: body.noPolisi,
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

    const { merk, bodyStyle, tipe } = body;

    await this.checkIsMobilMasterDataExist(body, {
      checkBodyStyle: !!bodyStyle,
      checkMerkMobil: !!merk,
      checkTipeMobil: !!tipe,
    });

    const updateData = await mobilData.updateOne(body);

    res.status(200).json({
      message: 'Data Updated',
      status: '201',
      data: updateData,
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
