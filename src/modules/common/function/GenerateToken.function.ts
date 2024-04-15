import { sign } from 'jsonwebtoken';

// ENUM
import { GenerateTokenType } from '../enum/GenerateTokenType.enum';

export default function GenerateToken(tokenType: string, payload: any) {
  switch (tokenType) {
    case GenerateTokenType.REFRESH_TOKEN:
      return sign(payload, process.env.JWT_REFRESH_SECRET as string, {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION,
      });

    case GenerateTokenType.ACCESS_TOKEN:
      return sign(payload, process.env.JWT_ACCESS_SECRET as string, {
        expiresIn: process.env.JWT_ACCESS_EXPIRATION,
      });
  }
}
