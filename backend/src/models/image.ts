import { Model, DataTypes } from "sequelize";
import { connection } from "../database/connection";
import { User } from "./user";

class Image extends Model {
    public id_image!: number;
    public title!: string; 
    public photo!: string;
    public description!: string;
    public userId!: number; 
}

Image.init(
    {
        id_image: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    },
    {
        sequelize: connection,
        tableName: 'images',
    }
);

Image.belongsTo(User, {
    foreignKey: 'userId',
});

/*Image.sync().then(() => {
    console.log("Table image created with success");
}).catch(error => {
    console.log("Ocurred this error " + error);
});*/

export { Image };


