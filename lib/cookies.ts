import { serialize } from 'cookie';
import { NextApiResponse } from 'next';

type Options = {
  expires?: Date;
  maxAge?: number;
  path?: string;
  sameSite?: 'strict' | 'lax' | 'none';
  httpOnly?: boolean;
};

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: Options = {}
) => {
  const stringValue = typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge * 1000);
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options));
};
