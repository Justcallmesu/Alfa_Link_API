import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePenjualanDto, UpdatePenjualanDto } from './Penjualan.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Penjualan } from '@/schemas/Penjualan/Penjualan';
import { Document, Model } from 'mongoose';
import { PenjualanCustomer } from '@/schemas/Penjualan/PenjualanCustomer';
import { Response } from 'express';
import { HistoryPembayaran } from '@/schemas/customer/HistoryPembayaran';
import { create } from 'domain';
import { Mobil } from '@/schemas/mobil/Mobil';
import { Customer } from '@/schemas/customer/Customer';

@Injectable()
export class PenjualanService {
  constructor(
    @InjectModel(Penjualan.name)
    private readonly penjualanModel: Model<Penjualan>,
    @InjectModel(HistoryPembayaran.name)
    private readonly historyCustomer: Model<HistoryPembayaran>,
    @InjectModel(PenjualanCustomer.name)
    private readonly PenjualanCustomerModel: Model<PenjualanCustomer>,
    @InjectModel(Mobil.name)
    private readonly mobilModel: Model<Mobil>,
    @InjectModel(Customer.name)
    private readonly customerModel: Model<Customer>,
  ) {}

  async createPenjualan(createPenjualan: CreatePenjualanDto) {
    const isExist: Penjualan | null = await this.penjualanModel.findOne({
      mobil: createPenjualan.mobil,
    });

    if (!isExist)
      throw new NotFoundException('Penjualan untuk Mobil ini sudah ada');

    const isMobilExist: Mobil | null = await this.mobilModel.findById(
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

    const newHistory = await this.historyCustomer.create({
      customer: createPenjualan.customer,
      penjualan: newPenjualan._id,
      metodePembayaran: createPenjualan.metodePembayaran,
      totalPembayaran: newPenjualan.totalHarga,
      totalTerbayar: 0,
    });

    newPenjualan.updateOne({ historyPembayaran: newHistory._id });

    return newPenjualan;
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
