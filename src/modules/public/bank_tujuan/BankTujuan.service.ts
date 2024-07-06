import { Model } from 'mongoose';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  BankTujuan,
  BankTujuanDocument,
} from '@/schemas/BankTujuan/BankTujuan';
import { MongoQuery } from '@/modules/common/class/MongoQuery.class';
import queryConstructor from '@/modules/common/function/queryConstructor';
import {
  BankTujuanFilterEnum,
  CreateBankTujuanDto,
  UpdateBankTujuanDto,
} from './BankTujuan.dto';
import { Response } from 'express';
import { getPagination } from '@/modules/common/function/pagination';

@Injectable()
export class BankTujuanService {
  constructor(
    @InjectModel(BankTujuan.name)
    private readonly bankTujuanModel: Model<BankTujuan>,
  ) {}
  async getAll(res: Response, query: any) {
    const { filter, pagination, select, sort } = queryConstructor(
      query,
      Object.values(BankTujuanFilterEnum),
    );

    const mongoQueryMeta = await new MongoQuery(
      this.bankTujuanModel,
      filter,
      sort,
      select,
      pagination,
    )
      .filter()
      .sort()
      .select()
      .paginate();

    const bankTujuanDatas = await mongoQueryMeta.mongoQuery;

    return res.json({
      message: 'Data Fetched',
      status: '200',
      data: bankTujuanDatas,
      meta: await getPagination(
        bankTujuanDatas,
        pagination,
        this.bankTujuanModel,
      ),
    });
  }

  async getOne(res: Response, id: string) {
    const bankTujuanData: BankTujuanDocument | null =
      await this.bankTujuanModel.findOne({
        _id: id,
      });

    if (!bankTujuanData) {
      throw new NotFoundException('Bank Tujuan Does Not Found');
    }

    res.json({
      message: 'Data Fetched',
      status: '200',
      data: bankTujuanData,
    });
  }

  async create(res: Response, body: CreateBankTujuanDto) {
    const isExist = await this.bankTujuanModel.findOne({
      namaBank: body.namaBank,
    });

    if (isExist) {
      throw new ConflictException('Bank Tujuan Already Exist');
    }

    const bankTujuanData = await this.bankTujuanModel.create(body);

    res.status(201).json({
      message: 'Data Created',
      status: '201',
      data: bankTujuanData,
    });
  }

  async update(res: Response, id: string, body: UpdateBankTujuanDto) {
    const bankTujuanData: BankTujuanDocument | null =
      await this.bankTujuanModel.findById(id);

    if (!bankTujuanData) {
      throw new NotFoundException('Bank Tujuan Doesnt Exist');
    }

    const updatedData = await bankTujuanData.updateOne(body);

    res.status(200).json({
      message: 'Data Updated',
      status: '201',
      data: updatedData,
    });
  }

  async delete(res: Response, id: string) {
    const bankTujuanData: BankTujuanDocument | null =
      await this.bankTujuanModel.findById(id);

    if (!bankTujuanData) {
      throw new NotFoundException('Bank Tujuan Doesnt Exist');
    }

    await bankTujuanData.deleteOne();

    res.status(204).json({
      message: 'Data Deleted',
      status: '204',
    });
  }
}
