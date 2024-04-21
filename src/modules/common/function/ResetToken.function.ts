import { Response } from 'express';

export default function ResetToken(res: Response) {
  res.cookie('refresh_token_jwt', '', {
    signed: true,
    expires: new Date(Date.now()),
  });
  res.cookie('access_token_jwt', '', {
    signed: true,
    expires: new Date(Date.now()),
  });
}
