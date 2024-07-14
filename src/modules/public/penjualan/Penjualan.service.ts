import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreatePenjualanDto,
  PenjualanFilterEnum,
  UpdatePenjualanDto,
  UpdatePenjualanStatus,
} from './Penjualan.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Penjualan, PenjualanDocument } from '@/schemas/Penjualan/Penjualan';
import { Document, Model } from 'mongoose';
import {
  PenjualanCustomer,
  PenjualanCustomerDocument,
} from '@/schemas/Penjualan/PenjualanCustomer';
import { Response } from 'express';
import { Mobil, MobilDocument } from '@/schemas/mobil/Mobil';
import { Customer } from '@/schemas/customer/Customer';
import queryConstructor from '@/modules/common/function/queryConstructor';
import parseAggregation from '@/modules/common/function/aggregationConstructor';
import { aggregationPagination } from '@/modules/common/function/pagination';
import { MongoQuery } from '@/modules/common/class/MongoQuery.class';
import { MerkMobil } from '@/schemas/mobil/mobil_properties/MerkMobil';
import { BodyStyle } from '@/schemas/mobil/mobil_properties/BodyStyle';
import { TipeMobil } from '@/schemas/mobil/mobil_properties/TipeMobil';
import { WarnaMobil } from '@/schemas/mobil/mobil_properties/WarnaMobil';
import { FuelType } from '@/schemas/mobil/mobil_properties/FuelType';
import { BankTujuan } from '@/schemas/BankTujuan/BankTujuan';
import { StatusMobil } from '../mobil/mobil.dto';
import { PenjualanStatus } from '@/modules/common/enum/penjualan/PenjualanEnum';

@Injectable()
export class PenjualanService {
  constructor(
    @InjectModel(Penjualan.name)
    private readonly penjualanModel: Model<Penjualan>,

    @InjectModel(PenjualanCustomer.name)
    private readonly PenjualanCustomerModel: Model<PenjualanCustomer>,

    @InjectModel(Mobil.name)
    private readonly mobilModel: Model<Mobil>,

    @InjectModel(Customer.name)
    private readonly customerModel: Model<Customer>,
    @InjectModel(BankTujuan.name)
    private readonly bankTujuan: Model<BankTujuan>,

    @InjectModel(MerkMobil.name) private merkMobilModel: Model<MerkMobil>,
    @InjectModel(BodyStyle.name) private bodyStyleModel: Model<BodyStyle>,
    @InjectModel(TipeMobil.name) private tipeMobilModel: Model<TipeMobil>,
    @InjectModel(WarnaMobil.name) private warnaMobilModel: Model<WarnaMobil>,
    @InjectModel(FuelType.name) private FuelTypeModel: Model<FuelType>,
  ) {}

  async createPenjualan(res: Response, createPenjualan: CreatePenjualanDto) {
    const isExist: Penjualan | null = await this.penjualanModel.findOne({
      mobil: createPenjualan.mobil,
    });

    if (isExist)
      throw new NotFoundException('Penjualan untuk Mobil ini sudah ada');

    const isMobilExist: MobilDocument | null = await this.mobilModel.findById(
      createPenjualan.mobil,
    );

    if (!isMobilExist) throw new NotFoundException('Mobil Tidak Ditemukan');

    const isCustomerExist: Customer | null = await this.customerModel.findById(
      createPenjualan.customer,
    );

    if (!isCustomerExist)
      throw new NotFoundException('Customer Tidak Ditemukan');

    const dataPenjualan: Omit<CreatePenjualanDto, 'customer'> = createPenjualan;

    const newPenjualan = await this.penjualanModel.create({
      ...dataPenjualan,
      totalHarga: isMobilExist.harga,
    });

    const PenjualanCustomer: PenjualanCustomerDocument | null =
      await this.PenjualanCustomerModel.findOne({
        customer: createPenjualan.customer,
      });

    if (PenjualanCustomer) {
      await PenjualanCustomer?.updateOne({
        penjualan: [...PenjualanCustomer.penjualan, newPenjualan._id],
      });
    } else {
      await this.PenjualanCustomerModel.create({
        customer: createPenjualan.customer,
        penjualan: [newPenjualan._id],
      });
    }

    await isMobilExist.updateOne({ status: StatusMobil.SOLD });

    res.status(200).json({
      message: 'Data Created',
      status: 200,
      data: newPenjualan,
    });
  }

  async getAllPenjualan(res: Response, query: any) {
    const { page = 1, limit = 10 } = query;

    const InspeksiAggregation = parseAggregation(
      { ...query, page, limit },
      Object.values(PenjualanFilterEnum),
      [
        {
          from: 'customer',
          localField: 'customer',
          foreignfield: '_id',
          as: 'customer',
          fieldToSearch: 'fullName',
        },
        {
          from: 'bankTujuan',
          localField: 'bankTujuan',
          foreignfield: '_id',
          as: 'bankTujuan',
          fieldToSearch: 'nama',
        },
        {
          from: 'mobil',
          localField: 'mobil',
          foreignfield: '_id',
          as: 'mobil',
          fieldToSearch: 'nama',
          nestedLookups: [
            {
              from: 'merkMobil',
              localField: 'merk',
              foreignfield: '_id',
              as: 'merk',
            },
            {
              from: 'bodyStyle',
              localField: 'bodyStyle',
              foreignfield: '_id',
              as: 'bodyStyle',
            },
            {
              from: 'tipeMobil',
              localField: 'tipe',
              foreignfield: '_id',
              as: 'tipe',
            },
            {
              from: 'WarnaMobil',
              localField: 'warnaInterior',
              foreignfield: '_id',
              as: 'warnaInterior',
            },
            {
              from: 'WarnaMobil',
              localField: 'warnaExterior',
              foreignfield: '_id',
              as: 'warnaExterior',
            },
            {
              from: 'fuelType',
              localField: 'jenisBahanBakar',
              foreignfield: '_id',
              as: 'jenisBahanBakar',
            },
          ],
        },
      ],
    );

    const inspeksiDatas = await new MongoQuery(this.penjualanModel).aggregation(
      InspeksiAggregation,
    ).aggregateQuery;

    const paginationMeta = await aggregationPagination<Penjualan>(
      inspeksiDatas,
      this.penjualanModel,
      { page, limit },
    );

    res.status(200).json({
      message: 'Data Fetched',
      status: 200,
      data: inspeksiDatas,
      meta: paginationMeta,
    });
  }

  async getPenjualan(res: Response, id: string) {
    const penjualanData: PenjualanDocument | null = await this.penjualanModel
      .findById(id)
      .populate({
        path: 'mobil',
        model: this.mobilModel,
        populate: [
          {
            path: 'merk',
            select: ['name'],
            model: this.merkMobilModel,
          },
          {
            path: 'bodyStyle',
            select: ['name'],
            model: this.bodyStyleModel,
          },
          {
            path: 'tipe',
            select: ['name'],
            model: this.tipeMobilModel,
          },
          {
            path: 'warnaExterior',
            select: ['name'],
            model: this.warnaMobilModel,
          },
          {
            path: 'warnaInterior',
            select: ['name'],
            model: this.warnaMobilModel,
          },
          {
            path: 'jenisBahanBakar',
            select: ['name'],
            model: this.FuelTypeModel,
          },
        ],
      })
      .populate({
        path: 'customer',
        model: this.customerModel,
      })
      .populate({
        path: 'bankTujuan',
        model: this.bankTujuan,
      });

    if (!penjualanData)
      throw new NotFoundException('Data Penjualan Tidak Ditemukan');

    res.status(200).json({
      message: 'Data Fetched',
      status: 200,
      data: penjualanData,
    });
  }

  async updatePenjualan(
    res: Response,
    id: string,
    updatePenjualan: UpdatePenjualanDto,
  ) {
    const dataPenjualan: PenjualanDocument | null =
      await this.penjualanModel.findById(id);

    if (!dataPenjualan)
      throw new NotFoundException('Data Penjualan Tidak Ditemukan');

    const updateData = await dataPenjualan.updateOne(updatePenjualan);

    if (
      updatePenjualan.status === PenjualanStatus.TIDAK_SANGGUP_PENAMBAHAN_DP
    ) {
      await this.mobilModel.updateOne(
        { _id: dataPenjualan.mobil },
        { status: StatusMobil.Ready },
      );
    }

    res.status(200).json({
      message: 'Data Diedit',
      status: 200,
    });
  }

  async deletePenjualan(id: string, res: Response) {
    const dataPenjualan: PenjualanDocument | null =
      await this.penjualanModel.findById(id);

    if (!dataPenjualan)
      throw new NotFoundException('Data Penjualan Tidak Ditemukan');

    await dataPenjualan.deleteOne();

    const PenjualanCustomer: PenjualanCustomerDocument | null =
      await this.PenjualanCustomerModel.findOne({
        penjualan: dataPenjualan._id,
      });

    if (PenjualanCustomer) {
      await PenjualanCustomer.updateOne({
        penjualan: PenjualanCustomer.penjualan.filter(
          (item) => item != dataPenjualan.id,
        ),
      });
    }

    await this.mobilModel.updateOne(
      { _id: dataPenjualan.mobil },
      { status: StatusMobil.Ready },
    );

    res.status(200).json({
      message: 'Data Dihapus',
      status: 200,
    });
  }

  async UpdateStatus(
    res: Response,
    updatePenjualan: UpdatePenjualanStatus,
    id: string,
  ) {
    const dataPenjualan: Document<Penjualan> | null =
      await this.penjualanModel.findById(id);

    if (!dataPenjualan)
      throw new NotFoundException('Data Penjualan Tidak Ditemukan');

    await dataPenjualan.updateOne(updatePenjualan);

    res.status(200).json({
      message: 'Data Diedit',
      status: 200,
    });
  }
}
