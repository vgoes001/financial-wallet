import { DataTypes } from 'sequelize';
import {
  Table,
  Model,
  PrimaryKey,
  Column,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import { UserModel } from '../../../user/repository/sequelize/user.model';

export type TransferModelAttributes = {
  id: string;
  senderId: string;
  receiverId: string;
  status: string;
  amount: number;
  transferDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

@Table({
  tableName: 'transfers',
})
export class TransferModel extends Model<TransferModelAttributes> {
  @PrimaryKey
  @Column(DataTypes.UUID)
  declare id: string;

  @ForeignKey(() => UserModel)
  @Column({ allowNull: false, type: DataTypes.UUID, field: 'sender_id' })
  declare senderId: string;

  @ForeignKey(() => UserModel)
  @Column({ allowNull: false, type: DataTypes.UUID, field: 'receiver_id' })
  declare receiverId: string;

  @Column({ allowNull: false, type: DataTypes.STRING(20) })
  declare status: string;

  @Column({ allowNull: false, type: DataTypes.DECIMAL(10, 2) })
  declare amount: number;

  @Column({ allowNull: false, type: DataTypes.DATE, field: 'transfer_date' })
  declare transferDate: Date;

  @CreatedAt
  @Column({ allowNull: false, type: DataTypes.DATE, field: 'created_at' })
  declare createdAt?: Date;

  @UpdatedAt
  @Column({ allowNull: false, type: DataTypes.DATE, field: 'updated_at' })
  declare updatedAt?: Date;

  @DeletedAt
  @Column({ allowNull: true, type: DataTypes.DATE, field: 'deleted_at' })
  declare deletedAt?: Date;
}
