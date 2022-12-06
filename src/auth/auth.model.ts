import { TEXT } from "sequelize";
import { STRING } from "sequelize";
import { Column, Model, Table, UpdatedAt,CreatedAt } from "sequelize-typescript";

@Table({
    tableName : 'user',
    timestamps: true,
    updatedAt: 'updatedAt'
})
export class Auth extends Model<Auth>{
    @Column({type:STRING, allowNull: false})
    name:string;

    @Column({type:STRING, unique:true, allowNull: false})
    email:string

    @Column({type:TEXT, allowNull: false})
    password : string

    @Column({defaultValue:'Active'})
    status : string;

    @Column({defaultValue:'0'}) 
    is_deleted: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}