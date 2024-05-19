import { MongoSort } from '@/modules/common/interface/MongoInterface/Sort.interface';
import { Pagination } from '@/modules/common/interface/Pagination/Pagination.interface';
import { QueryInterface } from '@/modules/common/interface/Query.interface';
import { StringObject } from '@/modules/common/type/object.type';
import { PipelineStage } from 'mongoose';

function parseSort(sort: string): MongoSort {
  const sortArray = sort.split('|');
  const sortField = sortArray[0];
  const sortDirection = sortArray[1].toUpperCase();
  return {
    [sortField]: sortDirection === 'ASC' ? 1 : -1,
  };
}

function parseAggregation(
  query: any,
  aggregationLookup:
    | Array<{
        from: string;
        localField: string;
        foreignfield: string;
        as: string;
        fieldToSearch: string;
        search?: string;
      }>
    | undefined,
  queryEnum: Array<string>,
) {
  const { sort, limit = 10, page = 1 } = query as QueryInterface;

  const aggregation: PipelineStage | Array<any> = [];
  const convertedField: {
    [key: string]: { [key: string]: { [key: string]: string } };
  } = {
    $addFields: {},
  };
  const lookupAggregation: Array<any> = [];
  const matchAggregation: Array<any> = [];
  const unwindArray: Array<any> = [];

  /**
   * Convert Field Into Object Id
   */
  aggregationLookup?.forEach((key) => {
    convertedField['$addFields'] = {
      [key.as]: {
        $toObjectId: `$${key.localField}`,
      },
    };
  });

  aggregation.push(convertedField);

  /**
   * Lookup the data
   */
  for (const lookup of aggregationLookup ?? []) {
    lookupAggregation.push({
      $lookup: {
        from: lookup.from,
        localField: lookup.localField,
        foreignField: lookup.foreignfield,
        as: lookup.as,
      },
    });
  }
  aggregation.push(...lookupAggregation);

  /**
   * Unwind the data
   */
  for (const lookup of aggregationLookup ?? []) {
    unwindArray.push({
      $unwind: {
        path: `$${lookup.as}`,
      },
    });
  }
  aggregation.push(...unwindArray);

  /**
   * Filter
   */
  aggregationLookup?.forEach((value) => {
    if (query[value.as]) {
      matchAggregation.push({
        $match: {
          [`${value.as}.${value.fieldToSearch}`]: {
            $regex: new RegExp(query[value.as], 'ig'),
          },
        },
      });
    }
  });

  queryEnum.forEach((value) => {
    if (query[value]) {
      matchAggregation.push({
        $match: {
          [value]: {
            $regex: new RegExp(query[value], 'ig'),
          },
        },
      });
    }
  });

  aggregation.push(...matchAggregation);

  /**
   * Pagination
   */
  aggregation.push({
    $skip: (page - 1) * limit,
  });

  aggregation.push({
    $limit: +limit,
  });

  if (/\w+\|\b(ASC|DESC)\b/gi.test(sort)) {
    aggregation.push({
      $sort: parseSort(sort),
    });
  }

  return aggregation;
}

function parseSelect(select: string) {
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
  type: 'Filter' | 'Aggregation' = 'Filter',
  aggregationLookup?: [
    {
      from: string;
      localField: string;
      foreignfield: string;
      as: string;
      fieldToSearch: string;
      search?: string;
    },
  ],
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

  /**
   * Aggregation Stage
   */
  let parsedAggregation: Array<any> = [];

  /**
   * If Query Aggregation
   */
  if (type === 'Aggregation') {
    parsedAggregation = parseAggregation(query, aggregationLookup, queryEnum);
    return { aggregation: parsedAggregation };
  }

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
    aggregation: parsedAggregation,
    pagination,
    sort: parsedSort,
    select: parsedSelect,
  };
}
