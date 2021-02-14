const parseParameters = (req, res, next) => {
	const query = req.query;

	if (!req.query.stocks || !req.query.exchange) {
		res.json({
			status: 422,
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