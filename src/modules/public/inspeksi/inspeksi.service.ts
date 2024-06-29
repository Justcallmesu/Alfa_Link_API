import { Model } from 'mongoose';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';

// Schema
import { Inspeksi, InspeksiDocument } from '@/schemas/mobil/inspeksi';
import { Mobil, MobilDocument } from '@/schemas/mobil/Mobil';
import {
  CreateInspeksiDTO,
  InspeksiFilterEnum,
  InspeksiQueryDto,
  UpdateInspeksiDTO,
} from './inspeksi.dto';
import parseAggregation from '@/modules/common/function/aggregationConstructor';
import { MongoQuery } from '@/modules/common/class/MongoQuery.class';
import { aggregationPagination } from '@/modules/common/function/pagination';

@Injectable()
export class InspeksiService {
  constructor(
    @InjectModel(Inspeksi.name) private readonly inspeksiModel: Model<Inspeksi>,
    @InjectModel(Mobil.name) private readonly mobilModel: Model<Mobil>,
  ) {}

  async findAll(res: Response, query: InspeksiQueryDto) {
    const { page = 1, limit = 10 } = query;

    const InspeksiAggregation = parseAggregation(
      { ...query, page, limit },
      Object.values(InspeksiFilterEnum),
      [
        {
          from: 'mobil',
          localField: 'mobil',
          foreignfield: '_id',
          as: 'mobil',
          fieldToSearch: 'nama',
        },
      ],
    );

    const inspeksiDatas = await new MongoQuery(this.inspeksiModel).aggregation(
      InspeksiAggregation,
    ).aggregateQuery;

    const paginationMeta = await aggregationPagination<Inspeksi>(
      inspeksiDatas,
      this.inspeksiModel,
      { page, limit },
    );

    res.status(200).json({
      message: 'Data Fetched',
      status: 200,
      data: inspeksiDatas,
      meta: paginationMeta,
    });
  }

  async findOne(res: Response, id: string) {
    const inspeksiData: InspeksiDocument | null =
      await this.inspeksiModel.findById(id);

    if (!inspeksiData)
      throw new NotFoundException('Data inspeksi Tidak Ditemukan');

    res.status(200).json({
      message: 'Data Fetched',
      status: 200,
      data: inspeksiData,
    });
  }

  async create(res: Response, createInspeksiData: CreateInspeksiDTO) {
    const inspeksiData: InspeksiDocument | null =
      await this.inspeksiModel.findOne({ mobil: createInspeksiData.mobil });

    if (inspeksiData) throw new ConflictException('Data inspeksi Sudah Ada');

    const checkIsMobilExist: MobilDocument | null =
      await this.mobilModel.findById(createInspeksiData.mobil);

    if (!checkIsMobilExist)
      throw new NotFoundException('Data Mobil Tidak Ditemukan');

    const createData = await this.inspeksiModel.create(createInspeksiData);

    await checkIsMobilExist.updateOne({ inspeksi: createData.id });

    res.status(200).json({
      message: 'Data Created',
      status: 200,
      data: createData,
    });
  }

  async update(
    res: Response,
    updateInspeksiData: UpdateInspeksiDTO,
    id: string,
  ) {
    const inspeksiData: InspeksiDocument | null =
      await this.inspeksiModel.findById(id);

    if (!inspeksiData)
      throw new NotFoundException('Data inspeksi Tidak Ditemukan');

    await inspeksiData.updateOne(updateInspeksiData);

    res.status(200).json({
      message: 'Data Updated',
      status: 200,
    });
  }

  async delete(res: Response, id: string) {
    const inspeksiData: InspeksiDocument | null =
      await this.inspeksiModel.findById(id);

    if (!inspeksiData)
      throw new NotFoundException('Data inspeksi Tidak Ditemukan');

    await inspeksiData.deleteOne();

    res.status(200).json({
      message: 'Data Deleted',
      status: 200,
    });
  }
}
