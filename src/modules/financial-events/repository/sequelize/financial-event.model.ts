import { DataTypes } from 'sequelize';
import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { TransferModel } from 'src/modules/transfer/repository/sequelize/transfer.model';
import { UserModel } from 'src/modules/user/repository/sequelize/user.model';

export type FinancialEventModelAttributes = {
  id: string;
  userId: string;
  amount: number;
  tranferId: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

@Table({
  tableName: 'financial_events',
})
export class FinancialEventModel extends Model<FinancialEventModelAttributes> {
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => UserModel)
  @Column({ allowNull: false, type: DataType.UUID, field: 'user_id' })
  declare userId: string;

  @Column({ allowNull: false, type: DataType.DECIMAL(10, 2) })
  declare amount: number;

  @ForeignKey(() => TransferModel)
  @Column({ allowNull: false, type: DataType.UUID, field: 'transfer_id' })
  declare tranferId: string;

  @Column({ allowNull: false, type: DataType.STRING(20) })
  declare type: string;

  @CreatedAt
  @Column({ allowNull: false, type: DataType.DATE, field: 'created_at' })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ allowNull: false, type: DataTypes.DATE, field: 'updated_at' })
  declare updatedAt: Date;

  @DeletedAt
  @Column({ allowNull: true, type: DataTypes.DATE, field: 'deleted_at' })
  declare deletedAt: Date;
}
