import { BadRequestException } from '@nestjs/common';
import { Aggregate, Model, Query } from 'mongoose';

/**
 * Interface
 */
import { PaginationMeta } from '../interface/Pagination/PaginationMeta.interface';
import { Pagination } from '../interface/Pagination/Pagination.interface';
import { MongoSort } from '../interface/MongoInterface/Sort.interface';

export class MongoQuery {
  /**
   * Public
   */
  public mongoQuery: Query<any, any>;
  public aggregateQuery: Aggregate<any[]>;
  public meta: PaginationMeta;

  /**
   * Private
   */
  private model: Model<any>;
  private filterQuery?: object;
  private sortQuery: MongoSort | undefined;
  private selectQuery?: string;
  private pagination?: Pagination = { page: 1, limit: 10 };

  constructor(
    model: Model<any>,
    filterQuery?: object,
    sort?: MongoSort | undefined,
    select?: string,
    pagination?: Pagination,
  ) {
    this.model = model;
    this.filterQuery = filterQuery;
    this.sortQuery = sort;
    this.selectQuery = select;
    this.pagination = pagination;
  }

  filter() {
    this.mongoQuery = this.model.find(this.filterQuery!);
    return this;
  }

  aggregation(aggregation: Array<any>) {
    this.aggregateQuery = this.model.aggregate(aggregation);
    return this;
  }

  sort() {
    this.mongoQuery = this.mongoQuery.sort(this.sortQuery);
    return this;
  }

  select() {
    this.mongoQuery = this.mongoQuery.select(this.selectQuery!);
    return this;
  }

  async paginate() {
    const { page, limit } = this.pagination!;
    const skip = (page - 1) * limit;

    this.mongoQuery = this.mongoQuery.skip(skip).limit(limit);

    const itemsCount = await this.model.countDocuments(this.filterQuery);

    this.meta = {
      page: +page,
      limit: +limit,
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
