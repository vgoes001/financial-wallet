import { DataTypes } from 'sequelize';
import {
  Column,
  CreatedAt,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

export type UserModelAttributes = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

@Table({
  tableName: 'users',
})
export class UserModel extends Model<UserModelAttributes> {
  @PrimaryKey
  @Column(DataTypes.UUID)
  declare id: string;

  @Column({ allowNull: false, type: DataTypes.STRING })
  declare name: string;

  @Column({ allowNull: false, type: DataTypes.STRING })
  declare email: string;

  @Column({ allowNull: false, type: DataTypes.STRING })
  declare password: string;

  @CreatedAt
  @Column({ allowNull: false, type: DataTypes.DATE, field: 'created_at' })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ allowNull: false, type: DataTypes.DATE, field: 'updated_at' })
  declare updatedAt: Date;

  @DeletedAt
  @Column({ allowNull: true, type: DataTypes.DATE, field: 'deleted_at' })
  declare deletedAt: Date;
}
