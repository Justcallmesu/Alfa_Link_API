import { Injectable } from '@nestjs/common';
import { CreateDto, UpdateDto } from './Penjualan.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Penjualan } from '@/schemas/Penjualan/Penjualan';
import { Model } from 'mongoose';
import { Penjualan_Customer } from '@/schemas/Penjualan/PenjualanCustomer';

@Injectable()
export class PenjualanService {
  constructor(
    @InjectModel(Penjualan.name) private penjualanModel: Model<Penjualan>,
    @InjectModel(Penjualan_Customer.name)
    private penjualan_customerModel: Model<Penjualan_Customer>,
  ) {}

  async create(createDto: CreateDto) {
    return 'This action adds a new ';
  }

  async findAll(res:Response) {
    const PenjualanDatas = await this.penjualanModel.find({})

    return
  }

  async findOne(id: number) {
    return `This action returns a #id `;
  }

  async update(id: number, updateDto: UpdateDto) {
    return `This action updates a #id `;
  }

  async remove(id: number) {
    return `This action removes a #id `;
  }
}
