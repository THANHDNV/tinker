import { Sequelize, DataTypes, Model } from 'sequelize';
export default (sequelize: Sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
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
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

