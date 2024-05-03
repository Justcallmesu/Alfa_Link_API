import { isValidObjectId } from 'mongoose';

import { registerDecorator } from 'class-validator';

export function CheckIsValidObjectId(property: string) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'CheckIsValidObjectId',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: {
        message: '$property must be a valid ObjectId',
      },
      validator: {
        validate(value: string) {
          return isValidObjectId(value);
        },
      },
    });
  };
}
