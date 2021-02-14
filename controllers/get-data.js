const got = require("got");
const HTMLParser = require("node-html-parser");
const Cache = require("memory-cache")

const getData = async (exchange, stock) => {
	const cachedValue = Cache.get(`${exchange}:${stock}`);
	if (cachedValue) {
		return cachedValue;
	}

	const gotConfig = {
		lowerCaseTagName: false,
		comment: false,
		blockTextElements: {
			script: false,
			noscript: false,
			style: false,
			pre: false
		}
	}

	return await got(`https://www.google.com/search?q=${exchange}:${stock}`, gotConfig)
		.then(response => {
			let parsed = HTMLParser.parse(response.body).querySelector("#main");
			const nodes = require("../resources/json/nodes.json");
			nodes[exchange].forEach(item => {
				parsed = parsed.childNodes[item];
			});

			const amount = Number(parsed.rawText.replace(",", "."));		
			Cache.put(`${exchange}:${stock}`, amount, 24 * 60 * 60 * 1000)

			return amount;
		});
}

exports.getData = getData;