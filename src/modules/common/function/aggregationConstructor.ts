import { PipelineStage } from 'mongoose';
import { QueryInterface } from '../interface/Query.interface';
import { parseSort } from './queryConstructor';

/**
 *
 * @param aggregationLookup
 * @returns {$addFields: {}}
 */
function parseConvertField(
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
) {
  const convertedField: {
    [key: string]: { [key: string]: { [key: string]: string } };
  } = {
    $addFields: {},
  };

  aggregationLookup?.forEach((value) => {
    convertedField.$addFields[value.as] = {
      $toObjectId: `$${value.localField}`,
    };
  });

  return convertedField;
}

/**
 * @param aggregationLookup
 * @returns Array<any>
 */
function parseLookup(
  aggregationLookup:
    | Array<{
        from: string;
        localField: string;
        foreignfield: string;
        as: string;
        fieldToSearch: string;
        search?: string;
        nestedLookups?: Array<{
          from: string;
          localField: string;
          foreignfield: string;
          as: string;
        }>;
      }>
    | undefined,
) {
  const lookupAggregation: Array<any> = [];

  for (const lookup of aggregationLookup ?? []) {
    const aggregatedLookup: {
      $lookup: {
        from: string;
        localField: string;
        foreignField: string;
        as: string;
        pipeline?: Array<any>;
      };
    } = {
      $lookup: {
        from: lookup.from,
        localField: lookup.localField,
        foreignField: lookup.foreignfield,
        as: lookup.as,
      },
    };

    if (lookup.nestedLookups && lookup.nestedLookups.length > 0) {
      aggregatedLookup.$lookup.pipeline = lookup.nestedLookups.map(
        (nestedLookup) => ({
          $lookup: {
            from: nestedLookup.from,
            localField: nestedLookup.localField,
            foreignField: nestedLookup.foreignfield,
            as: nestedLookup.as,
          },
        }),
      );
    }

    lookupAggregation.push(aggregatedLookup);
    lookupAggregation.push({
      $unwind: {
        path: `$${lookup.as}`,
        preserveNullAndEmptyArrays: true,
      },
    });
  }

  return lookupAggregation;
}

function parseUnwind(aggregationLookup: any) {
  const unwindArray: Array<any> = [];

  /**
   * Unwind the data
   */
  for (const lookup of aggregationLookup ?? []) {
    unwindArray.push({
      $unwind: {
        path: `$${lookup.as}`,
        preserveNullAndEmptyArrays: true,
      },
    });
  }

  return unwindArray;
}

function parseAggregation(
  query: any,
  queryEnum: Array<string>,
  aggregationLookup:
    | Array<{
        from: string;
        localField: string;
        foreignfield: string;
        as: string;
        fieldToSearch: string;
        search?: string;
        nestedLookups?: Array<{
          from: string;
          localField: string;
          foreignfield: string;
          as: string;
        }>;
      }>
    | undefined,
) {
  const { sort, limit = 10, page = 1 } = query as QueryInterface;

  const aggregation: PipelineStage | Array<any> = [];

  const matchAggregation: Array<any> = [];

  /**
   * Convert Field Into Object Id
   */
  aggregation.push(parseConvertField(aggregationLookup));

  /**
   * Lookup the data
   */
  aggregation.push(...parseLookup(aggregationLookup));

  /**
   * Unwind The Data (Convert Array Into Stand Alone Object)
   */
  aggregation.push(...parseUnwind(aggregationLookup));

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
      delete query[value.as];
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

export default parseAggregation;
