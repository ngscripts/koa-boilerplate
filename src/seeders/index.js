export const seedInit = async (db) => {
  await db.User.create({ email: 'abc@xyz.com' });
};