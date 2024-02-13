import { Model, DataTypes } from "sequelize";
import { connection } from '../database/connection';

class User extends Model {
    public id_user!: number;
    public name!: string;
    public email!: string;
    public password!: string;
}

User.init(
    {
      id_user: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
        sequelize: connection, 
        tableName: 'users',
      }
  );
  
 /*User.sync().then(() => {
    console.log("Table user created with success");
 }).catch(error => {
    console.log("Ocurred this error " + error);
 })*/
 
  export { User };
