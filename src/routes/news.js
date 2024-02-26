const News = require('../controllers/news');

module.exports = function (app) {
	app.route('/news').post(async (req, res, next) => {
		try {
			const data = req.body;
			console.log('data: ', data);
			return res.json({ data: await News.createNews(data) });
		} catch (err) {
			return next(err);
		}
	});

	app.route('/news').get(async (req, res, next) => {
		try {
			const data = req.query;
			console.log('data: ', data);
			return res.json({ data: await News.getNews(data) });
		} catch (err) {
			return next(err);
		}
	});
};
