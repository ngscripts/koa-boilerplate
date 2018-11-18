import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import { env } from '../config/env';
import { seedInit } from '../seeders';
import { logger } from '../config/logger'

export const db = {};
export const syncDB = async (isMigrate) => {
  const basename  = path.basename(__filename);
  const sequelize = new Sequelize(
    env.DB_NAME,
    env.DB_USERNAME,
    env.DB_PASSWORD, {
      logging: false,
      host: env.DB_HOST,
      dialect: env.DB_DIALECT,
      pool: {
        max: 5,
        min: 0,
        idle: 20000,
        acquire: 20000
      }
    });
  fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      var model = sequelize['import'](path.join(__dirname, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  try {
    await sequelize.authenticate();
    logger.debug('DB Authentication Completed');
    if (isMigrate) {
      logger.debug('DB Sync Flag is set to TRUE');
      await sequelize.drop();
      logger.debug('DB Tables been Dropped');
      await sequelize.sync();
      logger.debug('DB has been Synced');
      logger.debug('DB Seeders Started');
      await seedInit(db);
      logger.debug('DB Seeders has been Completed');
    }
    logger.debug('DB has been connected');
  } catch (e) {
    logger.error('DB sync failed due to: ', e);
    process.exit(1);
  }

};