const News = require('../controllers/news');

module.exports = function (app) {
	app.route('/news').post(async (req, res, next) => {
		try {
			const data = req.body;
			return res.json({ data: await News.createNews(data) });
		} catch (err) {
			return next(err);
		}
	});

	app.route('/news').get(async (req, res, next) => {
		try {
			const data = req.query;
			return res.json({ data: await News.getNews(data) });
		} catch (err) {
			return next(err);
		}
	});
};
