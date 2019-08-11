import { verify } from 'jsonwebtoken';
import { Context } from './types';

// can be moved to an env variable instead
export const APP_SECRET = 'appsecret321';

interface Token {
  userId: string;
}

export function getUserId(context: Context) {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const verifiedToken = verify(token, APP_SECRET) as Token;
    return verifiedToken && verifiedToken.userId;
  }
}
