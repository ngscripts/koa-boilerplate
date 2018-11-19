import { db } from '../models/index';
import { Conflict, NotFound, Forbidden } from 'fejl';
import { comparePassword, generateToken } from '../service/auth.service';
import _ from 'lodash';

const attributes = ['id', 'email', 'createdAt', 'updatedAt'];

const cleanUser = (user) => {
  return _.pick(user, attributes);
};

export const UserController = {
  getAllUsers: async (ctx, next) => ctx.ok({ users: await db.User.findAll({ attributes }), loggedUser: ctx.state.loggedUser }),
  register: async (ctx, next) => {
    const foundUser = await db.User.findOne({ where: { email: ctx.request.body.email } });
    if (foundUser) throw new Conflict('User With this email already exists');
    const createdUser = await db.User.create(ctx.request.body);
    const token = generateToken(cleanUser(createdUser));
    ctx.ok({ ...cleanUser(createdUser), token });
  },
  login: async (ctx, next) => {
    const foundUser = await db.User.findOne({ where: { email: ctx.request.body.email } });
    if (!foundUser) throw new NotFound('User with this email not found');
    if (!comparePassword(ctx.request.body.password, foundUser.password)) throw new Forbidden('The provided credentials are incorrect');
    const cleanedUser = cleanUser(foundUser);
    const token = generateToken(cleanedUser);
    ctx.ok({ ...cleanedUser, token });
  }
};