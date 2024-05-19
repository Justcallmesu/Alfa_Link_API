import { MongoSort } from '@/modules/common/interface/MongoInterface/Sort.interface';
import { Pagination } from '@/modules/common/interface/Pagination/Pagination.interface';
import { QueryInterface } from '@/modules/common/interface/Query.interface';
import { StringObject } from '@/modules/common/type/object.type';

export function parseSort(sort: string): MongoSort {
  const sortArray = sort.split('|');
  const sortField = sortArray[0];
  const sortDirection = sortArray[1].toUpperCase();
  return {
    [sortField]: sortDirection === 'ASC' ? 1 : -1,
  };
}

export function parseSelect(select: string) {
  const splitSelect = select.split('|');

  const results = [];
  for (const selectField of splitSelect) {
    if (!/^[-!]\w+$/.test(selectField)) {
      continue;
    }

    const parsedSelect = selectField.startsWith('!')
      ? `+${selectField.slice(1)}`
      : selectField;

    results.push(parsedSelect);
  }
  return results.join(' ');
}

export default function (
  query: StringObject | QueryInterface,
  queryEnum: Array<string>,
) {
  /**
   * Store Query Temporary
   */
  const newQuery: StringObject = query as StringObject;

  /**
   * All Query
   */
  const { sort, limit, page, select } = query as QueryInterface;

  /**
   * Query Parsed
   */
  const parsedQuery: { [key: string]: { [key: string]: RegExp } } = {};

  for (const key in query) {
    if (!queryEnum.includes(key)) {
      delete newQuery[key];
    } else {
      parsedQuery[key] = { $regex: new RegExp(newQuery[key], 'ig') };
    }
  }

  /**
   * Sort Query
   */
  const parsedSort: MongoSort | undefined = /\w+\|\b(ASC|DESC)\b/gi.test(sort)
    ? parseSort(sort)
    : undefined;

  /**
   * Select Query
   */
  const parsedSelect = select && parseSelect(select);

  const pagination: Pagination = {
    limit,
    page,
  };

  return {
    filter: parsedQuery,
    pagination,
    sort: parsedSort,
    select: parsedSelect,
  };
}
