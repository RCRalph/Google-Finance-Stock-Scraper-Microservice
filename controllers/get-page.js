const got = require("got");
const HTMLParser = require("node-html-parser");

// For development purpose only!
const getPage = async (exchange, stock) => {
	const gotConfig = {
		lowerCaseTagName: false,
		comment: false,
		blockTextElements: {
			script: true,
			noscript: true,
			style: true,
			pre: true
		}
	}

	return await got(`https://www.google.com/search?q=${exchange}:${stock}`, gotConfig)
		.then(response => {
			return HTMLParser.parse(response.body).querySelector("#main").toString();
		})
		.catch(err => {
			return err;
		});
}

exports.getPage = getPage;