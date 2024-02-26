const mysql = require('../lib/mysql');

const getAllMatches = async () => {
	const statement = 'select * from matches;';
	const parameters = [];
	return await mysql.query(statement, parameters);
};

const getTourIdFromMatchId = (matchId) => {
	const statement = `select tourId from matches where id = ${matchId};`;
	const parameters = [];
	return mysql.query(statement, parameters);
};

module.exports = {
	getAllMatches: getAllMatches,
	getTourIdFromMatchId: getTourIdFromMatchId,
};
