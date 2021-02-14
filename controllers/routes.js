const middleware = require("./middleware");
const getData = require("./get-data").getData;

module.exports = (app) => {
	app.get(
		"/",
		middleware.parseParameters,
		async (req, res) => {
			let resObj = {};
			resObj["len"] = await getData("wse", "qqq");
			
			res.json(resObj)
		}
	)
}