const parseParameters = (req, res, next) => {
	if (!req.query.stock && !req.query.exchange) {
		return res.json({
			message: "Welcome. Make sure to read the README.md file and follow the instructions.",
			"query-parameters": {
				exchange: "The code of stock exchange",
				stocks: "The codes of stocks from given stock exchange"
			}
		})
	}
	else if (!req.query.stocks || !req.query.exchange) {
		return res.status(422).json({
			message: "Invalid parameters"
		});
	}

	req.query.stocks = req.query.stocks
		.toLowerCase()
		.split(",")
		.map(item => item.trim());
		
	req.query.exchange = req.query.exchange
		.toLowerCase();

	next();
}

exports.parseParameters = parseParameters;