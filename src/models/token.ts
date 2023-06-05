import {Role} from "package-types";
import {Model, Table, Column, DataType, AllowNull, PrimaryKey, Default, Unique} from "sequelize-typescript";

@Table({tableName: 'tokens'})
export default class Token extends Model<Token>{
    @PrimaryKey
    @Column({
        type: DataType.UUIDV4,
        defaultValue: DataType.UUIDV4
    })
    id: string;

    @Column(DataType.CHAR(600))
    token: string;

    @Column(DataType.CHAR(20))
    type: string;

    @Column(DataType.UUIDV4)
    userId: string;

    @Column(DataType.DATE)
    createdAt: Date;

    @Column(DataType.DATE)
    updatedAt: Date;
}
