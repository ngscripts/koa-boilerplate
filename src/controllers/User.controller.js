import { db } from '../models/index';

export const UserController = {
  getAllUsers: async (ctx, next) => ctx.ok(await db.User.findAll()),
  createUser: async (ctx, next) => ctx.ok({ registered: true })
};