import { Model } from 'mongoose';
import { PaginationMeta } from '../interface/Pagination/PaginationMeta.interface';
import { Pagination } from '../interface/Pagination/Pagination.interface';

export async function aggregationPagination<T>(
  data: Array<any>,
  model: Model<T>,
  paginationQuery: Pagination,
): Promise<PaginationMeta> {
  const { limit, page } = paginationQuery;

  const documentCount = await model.countDocuments({});

  return {
    page: +page,
    limit: +limit,
    itemsCount: data.length,
    totalPage: Math.ceil(documentCount / +limit),
  };
}

export async function getPagination<T>(
  data: Array<T>,
  paginationQuery: Pagination,
): Promise<PaginationMeta> {
  const { limit, page } = paginationQuery;

  return {
    page: +page,
    limit: +limit,
    itemsCount: data.length,
    totalPage: Math.ceil(data.length / +limit),
  };
}
