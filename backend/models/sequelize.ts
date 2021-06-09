import { Sequelize } from 'sequelize';
const env = process.env.NODE_ENV || 'development';
const config = require("../config/config.json")[env];

let sequelize: Sequelize;

export default () => {
	if (!sequelize) {
		if (config.use_env_variable) {
			sequelize = new Sequelize(process.env[config.use_env_variable] as any, config);
		} else {
			sequelize = new Sequelize(config.database, config.username, config.password, config);
		}
	}

	return sequelize;
}