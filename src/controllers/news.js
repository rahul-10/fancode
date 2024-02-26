const News = require('../models/news');
const Match = require('../models/match');
const Tour = require('../models/tour');

const CustomError = require('../utils/customError');

const createNews = async (data) => {
	const { title, description, matchId, tourId } = data;

	if (!title) {
		throw new Error('Title is missing');
	}
	if (!description) {
		throw new Error('Description is missing');
	}
	//News can be create either match for tour
	if ((!matchId && !tourId) || (matchId && tourId)) {
		throw new CustomError('Either matchId or tourId should be present', 400);
	}

	const record = {
		title,
		description,
		type: matchId ? 'match' : 'tour',
	};

	if (matchId) {
		record.matchId = matchId;
		// Get tour id associated with match
		const tours = await Match.getTourIdFromMatchId(matchId);
		if (!tours || tours.length == 0) {
			throw new CustomError("Didn't find tour for this match", 400);
		}
		record.tourId = tours[0].tourId;
	} else {
		record.tourId = tourId;

		// Get sport associated with tour
		const sports = await Tour.getSportIdFromTourId(tourId);
		if (!sports || sports.length == 0) {
			throw new CustomError("Didn't find sport for this tour", 400);
		}
		record.sportId = sports[0].sportId;
	}
	await News.createNews(record);
	return 'Created news';
};

// pagination can also be applied but ignoring now as not mentioned in the problem statement
const getNews = (data) => {
	const { matchId, tourId, sportId } = data;
	if (!matchId && !tourId && !sportId) {
		throw new CustomError(
			'Pass atleast one of matchId, tourId, sportId query param',
			400
		);
	}
	return News.getNewsWithFilter(data);
};

module.exports = {
	createNews: createNews,
	getNews: getNews,
};
