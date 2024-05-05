import { BadRequestException } from '@nestjs/common';
import { Model, Query } from 'mongoose';

export type Pagination = {
  page: number;
  limit: number;
};

export class MongoQuery {
  /**
   * Public
   */
  public mongoQuery: Query<any, any>;
  public meta: {
    page: number;
    limit: number;
    totalPage: number;
  };

  /**
   * Private
   */
  private model: Model<any>;
  private filterQuery: object;
  private sortQuery: { [key: string]: 1 | -1 };
  private selectQuery: string;
  private pagination: Pagination = { page: 1, limit: 10 };

  constructor(
    model: Model<any>,
    filterQuery: object,
    sort: { [key: string]: 1 | -1 },
    select: string,
    pagination: Pagination,
  ) {
    this.model = model;
    this.filterQuery = filterQuery;
    this.sortQuery = sort;
    this.selectQuery = select;
    this.pagination = pagination;
  }

  filter() {
    this.mongoQuery = this.model.find(this.filterQuery);
    console.log(this.filterQuery);
    return this;
  }

  sort() {
    this.mongoQuery = this.mongoQuery.sort(this.sortQuery);
    return this;
  }

  select() {
    this.mongoQuery = this.mongoQuery.select(this.selectQuery);
    return this;
  }

  async paginate() {
    const { page, limit } = this.pagination;
    const skip = (page - 1) * limit;

    this.mongoQuery = this.mongoQuery.skip(skip).limit(limit);

    const itemsCount = await this.model.countDocuments(this.filterQuery);

    this.meta = {
      page,
      limit,
      totalPage: Math.ceil(itemsCount / limit),
    };

    if (page > this.meta.totalPage) {
      throw new BadRequestException(
        `${this.model.modelName} Pagination is Out of Bound`,
      );
    }

    return this;
  }
}
