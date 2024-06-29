import { Model } from 'mongoose';
import { PaginationMeta } from '../interface/Pagination/PaginationMeta.interface';
import { Pagination } from '../interface/Pagination/Pagination.interface';

export async function aggregationPagination<T>(
  data: Array<any>,
  model: Model<T>,
  paginationQuery: Pagination,
) {
  const { limit, page } = paginationQuery;

  const documentCount = await model.countDocuments({});

  return {
    page: +page,
    limit: +limit,
    total: data.length,
    totalItems: documentCount,
    totalPage: Math.ceil(documentCount / +limit),
  };
}
