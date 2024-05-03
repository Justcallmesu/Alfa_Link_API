import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePenjualanDto, UpdatePenjualanDto } from './Penjualan.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Penjualan } from '@/schemas/Penjualan/Penjualan';
import { Document, Model } from 'mongoose';
import { PenjualanCustomer } from '@/schemas/Penjualan/PenjualanCustomer';
import { Response } from 'express';

@Injectable()
export class PenjualanService {
  constructor(
    @InjectModel(Penjualan.name) private penjualanModel: Model<Penjualan>,
    @InjectModel(PenjualanCustomer.name)
    private PenjualanCustomerModel: Model<PenjualanCustomer>,
  ) {}

  async createPenjualan(createPenjualan: CreatePenjualanDto) {
    const isExist: Penjualan | null = await this.penjualanModel.findOne({});

    if (!isExist) throw new NotFoundException('Data Penjualan Tidak Ditemukan');
  }

  async getAllPenjualan() {
    const PenjualanDatas: Penjualan[] = await this.penjualanModel.find({});

    return PenjualanDatas;
  }

  async getPenjualan(id: number) {
    const penjualanData: Penjualan | null =
      await this.penjualanModel.findById(id);

    if (!penjualanData)
      throw new NotFoundException('Data Penjualan Tidak Ditemukan');

    return penjualanData;
  }

  async updatePenjualan(id: number, UpdatePenjualanDto: UpdatePenjualanDto) {
    const isExist: Document<Penjualan> | null =
      await this.penjualanModel.findById(id);

    if (!isExist) throw new NotFoundException('Data Penjualan Tidak Ditemukan');

    const updateData = await isExist.updateOne(UpdatePenjualanDto);

    return updateData;
  }

  async deletePenjualan(id: number, res: Response) {
    const isExist: Document<Penjualan> | null =
      await this.penjualanModel.findById(id);

    if (!isExist) throw new NotFoundException('Data Penjualan Tidak Ditemukan');

    await isExist.deleteOne();

    return res.status(204).end();
  }
}
