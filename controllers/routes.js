const middleware = require("./middleware");
const getData = require("./get-data").getData;
const getPage = require("./get-page").getPage;

module.exports = (app) => {
	// For development purpose only!
	if (process.env.APP_ENV == "local") {
		app.get(
			"/page",
			middleware.parseParameters,
			async (req, res) => {
				return res.send(await getPage(req.query.exchange, req.query.stocks[0]))
			}
		);
	}

	app.get(
		"/",
		middleware.parseParameters,
		async (req, res) => {
			// Get all the requested stocks
			const tasks = req.query.stocks
				.map(item => getData(req.query.exchange, item));

			const results = await Promise.all(tasks);
			let resObj = {};

			results.forEach(item => {
				resObj[item.stock] = item.amount;
			});

			return res.json(resObj)
		}
	)
}