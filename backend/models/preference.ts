import { Sequelize, DataTypes, Model, Optional } from 'sequelize'
import getSequelize from './sequelize';
import UserModel from './user';

const sequelize = getSequelize();

export interface PreferenceAttribute {
	id: number;
	userId: string;
	targetId: string;
	isLiked: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IPreferenceCreationAttributes extends Optional<PreferenceAttribute, "id"> {}

interface PreferenceInstance
  extends Model<PreferenceAttribute, IPreferenceCreationAttributes>,
    PreferenceAttribute {}

const Preference = sequelize.define<PreferenceInstance>("Preference", {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	userId: {
		type: DataTypes.STRING,
		unique: 'compositeIndex'
	},
	targetId: {
		type: DataTypes.STRING,
		unique: 'compositeIndex'
	},
	isLiked: DataTypes.BOOLEAN,
	createdAt: DataTypes.DATE,
	updatedAt: DataTypes.DATE
});

Preference.belongsTo(UserModel, { foreignKey: "userId" })
Preference.belongsTo(UserModel, { foreignKey: "targetId" })

export default Preference;