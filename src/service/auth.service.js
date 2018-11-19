import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const comparePassword = (inPass, hash) => (
  bcrypt.compareSync(inPass, hash)
);

export const generateToken = (payload) => jwt.sign({ ...payload, iat: Math.floor(Date.now() / 1000) - env.JWT_EXPIRE_IN }, env.JWT_SECRET);