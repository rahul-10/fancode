const mysql = require('../lib/mysql');

const createNews = (data) => {
	const statement = `insert into news(title, description, type, matchId, tourId, sportId) values (?, ?, ?, ?, ?, ?);`;
	const parameters = [
		data.title,
		data.description,
		data.type,
		data.matchId,
		data.tourId,
		data.sportId,
	];
	return mysql.query(statement, parameters);
};

const getNewsWithFilter = ({ matchId, tourId, sportId }) => {
	let flag = false;
	let statement = 'select id, title, description from news where ';
	if (matchId) {
		flag = true;
		statement = statement + `matchId = ${matchId}`;
	}
	if (tourId) {
		if (flag) {
			statement = statement + ' and ';
		}
		statement = statement + `tourId = ${tourId}`;
		flag = true;
	}

	if (sportId) {
		if (flag) {
			statement = statement + ' and ';
		}
		statement = statement + `sportId = ${sportId}`;
	}

	const parameters = [];
	return mysql.query(statement, parameters);
};

module.exports = {
	createNews: createNews,
	getNewsWithFilter: getNewsWithFilter,
};
