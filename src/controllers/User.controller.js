export const UserController = {
  getAllUsers: async (ctx, next) => ctx.ok([]),
  createUser: async (ctx, next) => ctx.ok({ registered: true })
};