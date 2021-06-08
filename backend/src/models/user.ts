import { Sequelize, DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './sequelize';

export interface UserAttributes {
	id: string;
	firstName: string;
	lastName: string;
	picture: string;
	dateOfBirth: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}
interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

const User = sequelize.define<UserInstance>("User", {
	id: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	picture: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	dateOfBirth: {
		type: DataTypes.DATE,
		allowNull: false
	},
	createdAt: {
		type: "TIMESTAMP",
		defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
	},
	updatedAt: {
		type: "TIMESTAMP",
		defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
	},
});

export default User;