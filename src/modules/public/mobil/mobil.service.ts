import { Injectable, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// DTO
import {
  CreateMobilDto,
  MobilFilterEnum,
  MobilQueryDto,
  StatusMobil,
  UpdateMobilDto,
  UpdateMobilStatusDto,
} from './mobil.dto';

// Schema
import { Mobil, MobilDocument } from '@/schemas/mobil/Mobil';
import { MerkMobil } from '@/schemas/mobil/mobil_properties/MerkMobil';
import { BodyStyle } from '@/schemas/mobil/mobil_properties/BodyStyle';
import { TipeMobil } from '@/schemas/mobil/mobil_properties/TipeMobil';
import { WarnaMobil } from '@/schemas/mobil/mobil_properties/WarnaMobil';
import { FuelType } from '@/schemas/mobil/mobil_properties/FuelType';
import { MongoQuery } from '@/modules/common/class/MongoQuery.class';
import parseAggregation from '@/modules/common/function/aggregationConstructor';
import { aggregationPagination } from '@/modules/common/function/pagination';
import { Penjualan } from '@/schemas/Penjualan/Penjualan';

@Injectable()
export class MobilService {
  constructor(
    @InjectModel(Mobil.name) private mobilModel: Model<Mobil>,
    @InjectModel(MerkMobil.name) private merkMobilModel: Model<MerkMobil>,
    @InjectModel(BodyStyle.name) private bodyStyleModel: Model<BodyStyle>,
    @InjectModel(TipeMobil.name) private tipeMobilModel: Model<TipeMobil>,
    @InjectModel(WarnaMobil.name) private warnaMobilModel: Model<WarnaMobil>,
    @InjectModel(FuelType.name) private FuelTypeModel: Model<FuelType>,
    @InjectModel(Penjualan.name) private penjualanModel: Model<Penjualan>,
  ) {}

  async getAll(res: Response, query: MobilQueryDto) {
    const { page = 1, limit = 10 } = query;
    const aggregation = parseAggregation(
      {
        ...query,
        page,
        limit,
      },
      Object.values(MobilFilterEnum),
      [
        {
          from: 'merkMobil',
          localField: 'merk',
          foreignfield: '_id',
          as: 'merk',
          fieldToSearch: 'name',
        },
        {
          from: 'bodyStyle',
          localField: 'bodyStyle',
          foreignfield: '_id',
          as: 'bodyStyle',
          fieldToSearch: 'name',
        },
        {
          from: 'tipeMobil',
          localField: 'tipe',
          foreignfield: '_id',
          as: 'tipe',
          fieldToSearch: 'name',
        },
        {
          from: 'WarnaMobil',
          localField: 'warnaInterior',
          foreignfield: '_id',
          as: 'warnaInterior',
          fieldToSearch: 'name',
        },
        {
          from: 'WarnaMobil',
          localField: 'warnaExterior',
          foreignfield: '_id',
          as: 'warnaExterior',
          fieldToSearch: 'name',
        },
        {
          from: 'fuelType',
          localField: 'jenisBahanBakar',
          foreignfield: '_id',
          as: 'jenisBahanBakar',
          fieldToSearch: 'name',
        },
      ],
    );

    const mongoQueryMeta = new MongoQuery(this.mobilModel).aggregation(
      aggregation,
    );

    const mobilDatas = await mongoQueryMeta.aggregateQuery.exec();

    const paginationMeta = await aggregationPagination<Mobil>(
      mobilDatas,
      this.mobilModel,
      {
        page,
        limit,
      },
    );

    return res.json({
      message: 'Data Fetched',
      status: '200',
      data: mobilDatas,
      meta: paginationMeta,
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
      throw new NotFoundException('Mobil Tidak Ditemukan');
    }

    res.json({
      message: 'Data Fetched',
      status: '200',
      data: mobilData,
    });
  }

  async createMobil(res: Response, body: CreateMobilDto) {
    const isMobilWithSameNoPolisiExist = await this.mobilModel.findOne({
      noPolisi: body.noPolisi,
    });

    if (isMobilWithSameNoPolisiExist) {
      throw new NotFoundException('Mobil Dengan No Polisi Sama Sudah Dibuat');
    }

    await this.checkIsMobilMasterDataExist(body);
    const convertedData: CreateMobilDto =
      await this.convertEmptyStringToNull(body);
    convertedData.status = StatusMobil.NEW;

    const mobilData = await this.mobilModel.create(convertedData);

    res.status(201).json({
      message: 'Data Created',
      status: '201',
      data: mobilData,
    });
  }

  async updateMobil(res: Response, id: string, body: UpdateMobilDto) {
    const mobilData: MobilDocument | null = await this.mobilModel.findById(id);

    if (!mobilData) {
      throw new NotFoundException('Mobil Tidak Ditemukan');
    }

    const isMobilWithSameNoPolisiExist = await this.mobilModel.findOne({
      _id: { $ne: id },
      noPolisi: body.noPolisi,
    });

    if (isMobilWithSameNoPolisiExist) {
      throw new NotFoundException('Mobil Dengan No Polisi Sama Sudah Dibuat');
    }

    const { merk, bodyStyle, tipe } = body;

    await this.checkIsMobilMasterDataExist(body);
    const convertedData: CreateMobilDto =
      await this.convertEmptyStringToNull(body);

    const updateData = await mobilData.updateOne(convertedData);

    res.status(200).json({
      message: 'Data Diedit',
      status: '201',
      data: updateData,
    });
  }

  async updateStatus(res: Response, id: string, body: UpdateMobilStatusDto) {
    const mobilData: MobilDocument | null = await this.mobilModel.findById(id);

    if (!mobilData) {
      throw new NotFoundException('Mobil Tidak Ditemukan');
    }

    mobilData.status = body.status;

    await mobilData.save();

    res.status(200).json({
      message: 'Data Diedit',
      status: '200',
      data: mobilData,
    });
  }

  async deleteMobil(res: Response, id: string) {
    const mobilData: MobilDocument | null = await this.mobilModel.findById(id);

    if (!mobilData) {
      throw new NotFoundException('Mobil Tidak Ditemukan');
    }

    const isUsed = await this.penjualanModel.findOne({ mobil: id });

    if (isUsed) {
      throw new NotFoundException('Data Sedang Digunakan');
    }

    await mobilData.deleteOne();

    res.status(204).json({
      message: 'Data Dihapus',
      status: '204',
    });
  }

  private async convertEmptyStringToNull(body: CreateMobilDto) {
    const convertedData = { ...body };

    for (const key in convertedData) {
      if (convertedData[key] === '') {
        convertedData[key] = null;
      }
    }

    return convertedData;
  }

  private async checkIsMobilMasterDataExist(
    body: CreateMobilDto | UpdateMobilDto,
  ) {
    const {
      merk,
      bodyStyle,
      tipe,
      warnaExterior,
      warnaInterior,
      jenisBahanBakar,
    } = body;

    if (merk) {
      const isMerkMobilExist = await this.merkMobilModel.findById(merk);

      if (!isMerkMobilExist) {
        throw new NotFoundException('Merk Mobil Tidak Ditemukan');
      }
    }

    if (bodyStyle) {
      const isBodyStyleExist = await this.bodyStyleModel.findById(bodyStyle);

      if (!isBodyStyleExist) {
        throw new NotFoundException('Body Style Tidak Ditemukan');
      }
    }

    if (tipe) {
      const isTipeMobilExist = await this.tipeMobilModel.findById(tipe);

      if (!isTipeMobilExist) {
        throw new NotFoundException('Tipe Mobil Tidak Ditemukan');
      }
    }

    if (warnaExterior) {
      const isWarnaExteriorExist =
        await this.warnaMobilModel.findById(warnaExterior);

      if (!isWarnaExteriorExist) {
        throw new NotFoundException('Warna Exterior Tidak Ditemukan');
      }
    }

    if (warnaInterior) {
      const isWarnaInteriorExist =
        await this.warnaMobilModel.findById(warnaInterior);

      if (!isWarnaInteriorExist) {
        throw new NotFoundException('Warna Interior Tidak Ditemukan');
      }
    }

    if (jenisBahanBakar) {
      const isFuelTypeExist =
        await this.FuelTypeModel.findById(jenisBahanBakar);

      if (!isFuelTypeExist) {
        throw new NotFoundException('Fuel Type Tidak Ditemukan');
      }
    }
  }
}
