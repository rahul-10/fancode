const mysql = require('../lib/mysql');

const getAllTours = async () => {
	const statement = 'select * from tours;';
	const parameters = [];
	return await mysql.query(statement, parameters);
};

const getMatchesByTourName = async (params) => {
	const statement =
		'select * from matches inner join tours on matches.tourId = tours.id where tours.name = ?';
	const parameters = [params.name];
	return await mysql.query(statement, parameters);
};

const getSportIdFromTourId = (tourId) => {
	const statement = `select sportId from tours where id = ${tourId};`;
	const parameters = [];
	return mysql.query(statement, parameters);
};

module.exports = {
	getAllTours: getAllTours,
	getMatchesByTourName: getMatchesByTourName,
	getSportIdFromTourId: getSportIdFromTourId,
};
