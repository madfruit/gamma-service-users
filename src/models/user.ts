import {Role} from "package-types";
import {Model, Table, Column, DataType, AllowNull, PrimaryKey, Default, Unique} from "sequelize-typescript";

@Table({tableName: 'users'})
export default class User extends Model<User>{
    @PrimaryKey
    @Column({
        type: DataType.UUIDV4,
        defaultValue: DataType.UUIDV4
    })
    id: string

    @Default(Role.USER)
    @Column(DataType.CHAR(10))
    role: string

    @Unique
    @Column(DataType.CHAR(100))
    email: string

    @Unique
    @Column(DataType.CHAR(50))
    nickname: string

    @Column(DataType.CHAR(300))
    password: string

    @AllowNull
    @Column(DataType.CHAR(400))
    avatar?: string

    @Column(DataType.DATE)
    createdAt: Date

    @AllowNull
    @Column(DataType.DATE)
    updatedAt: Date
}
