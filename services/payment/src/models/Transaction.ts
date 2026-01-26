import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

interface TransactionAttributes {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  stripePaymentIntentId?: string;
}

interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'id'> {}

class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
  public id!: string;
  public bookingId!: string;
  public userId!: string;
  public amount!: number;
  public currency!: string;
  public status!: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  public stripePaymentIntentId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Transaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    bookingId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'usd',
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'),
      defaultValue: 'PENDING',
    },
    stripePaymentIntentId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'transactions',
  }
);

export default Transaction;
