import { Request, Response, NextFunction } from 'express';
import { randomBytes, pbkdf2Sync } from 'crypto';
import { IUser } from '@Model/user.model';

const passwordEncryption = (req: Request, res: Response, next: NextFunction) => {
  const password: IUser['password'] = req.body.password;
  const passwordKey: IUser['passwordKey'] =
    (res.locals.user && res.locals.user.passwordKey) || randomBytes(64).toString('base64');

  const PASSWORD_ENCRYPTION_CONFIG = {
    ITERATION: parseInt(process.env.PASSWORD_ENCRYPTION_ITERATION, 10),
    KEY_LENGTH: parseInt(process.env.PASSWORD_ENCRYPTION_KEY_LENGTH, 10),
    DIGEST: process.env.PASSWORD_ENCRYPTION_DIGEST,
  };

  const encryptionPassword: string = pbkdf2Sync(
    password,
    passwordKey,
    PASSWORD_ENCRYPTION_CONFIG.ITERATION,
    PASSWORD_ENCRYPTION_CONFIG.KEY_LENGTH,
    PASSWORD_ENCRYPTION_CONFIG.DIGEST
  ).toString('base64');

  res.locals.temp = {
    password: encryptionPassword,
    passwordKey,
  };

  next();
};

export default passwordEncryption;
