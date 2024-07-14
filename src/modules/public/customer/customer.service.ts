import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// DTO
import {
  CreateCustomerDto,
  CustomerFilterQuery,
  UpdateCustomerDto,
} from './customer.dto';

// Schema
import { Customer, CustomerDocument } from '@/schemas/customer/Customer';
import { MongoQuery } from '@/modules/common/class/MongoQuery.class';
import customerQueryConstructor from '../../common/function/queryConstructor';
import { getPagination } from '@/modules/common/function/pagination';
import { Penjualan } from '@/schemas/Penjualan/Penjualan';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
    @InjectModel(Penjualan.name) private penjualanModel: Model<Penjualan>,
  ) {}

  async getAll(res: Response, query: any) {
    const { filter, pagination, select, sort } = customerQueryConstructor(
      query,
      Object.values(CustomerFilterQuery),
    );

    const mongoQueryMeta = await new MongoQuery(
      this.customerModel,
      filter,
      sort,
      select,
      pagination,
    )
      .filter()
      .sort()
      .select()
      .paginate();

    const customerDatas = await mongoQueryMeta.mongoQuery;

    return res.json({
      message: 'Data Fetched',
      status: '200',
      data: customerDatas,
      meta: await getPagination(customerDatas, pagination, this.customerModel),
    });
  }

  async getOne(res: Response, id: string) {
    const customerData: CustomerDocument | null =
      await this.customerModel.findOne({ _id: id });

    if (!customerData) {
      throw new NotFoundException('Customer Tidak Ditemukan');
    }

    res.json({
      message: 'Data Fetched',
      status: '200',
      data: customerData,
    });
  }

  async createCustomer(res: Response, body: CreateCustomerDto) {
    const isExist: Array<CustomerDocument> | null =
      await this.customerModel.find({ fullName: body.fullName });

    if (isExist?.length) {
      throw new ConflictException('There is Existing data with same name');
    }
    console.log(body);
    const customerData = await this.customerModel.create(body);

    res.status(201).json({
      message: 'Data Created',
      status: '201',
      data: customerData,
    });
  }

  async updateCustomer(res: Response, id: string, body: UpdateCustomerDto) {
    const customerData: CustomerDocument | null =
      await this.customerModel.findById(id);

    if (!customerData) {
      throw new NotFoundException('Customer Tidak Ditemukan');
    }

    await customerData.updateOne(body);

    res.status(200).json({
      message: 'Data Diedit',
      status: '201',
      data: customerData,
    });
  }

  async deleteCustomer(res: Response, id: string) {
    const customerData: CustomerDocument | null =
      await this.customerModel.findById(id);

    if (!customerData) {
      throw new NotFoundException('Customer Tidak Ditemukan');
    }

    const isUsed = await this.penjualanModel.findOne({ customer: id });

    if (isUsed) {
      throw new ConflictException('Data Customer Sedang Digunakan');
    }

    await customerData.deleteOne();

    res.status(204).json({
      message: 'Data Dihapus',
      status: '204',
    });
  }
}
