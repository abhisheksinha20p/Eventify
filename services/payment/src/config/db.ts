import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/payment_db', {
  dialect: 'postgres',
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL Connected via Sequelize');
    // Sync models (dev only, usually use migrations in prod)
    await sequelize.sync(); 
  } catch (error: any) {
    console.error('Unable to connect to PostgreSQL:', error.message);
    process.exit(1);
  }
};

export { sequelize, connectDB };
