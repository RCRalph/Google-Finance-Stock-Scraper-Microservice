const got = require("got");
const HTMLParser = require("node-html-parser");
const Cache = require("memory-cache")

const getData = async (exchange, stock) => {
	// Check if the stock is cached
	const cachedValue = Cache.get(`${exchange}:${stock}`);
	if (cachedValue) {
		return {
			stock,
			amount: cachedValue
		};
	}

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

	// Get the page to scrap
	return await got(`https://www.google.com/search?q=${exchange}:${stock}`, gotConfig)
		.then(response => {
			let parsed = HTMLParser.parse(response.body).querySelector("#main");
			const nodes = require("../resources/json/nodes.json");

			// Go through every possible node configuration and check if it returns the correct value
			// Node configuration can be cound in resources/json/nodes.json
			let result = false;
			for (let i = 0; !result && i < nodes.length; i++) {
				let parsedCopy = {...parsed};

				for (let j = 0; parsedCopy && j < nodes[i].length; j++) {
					parsedCopy = parsedCopy.childNodes[nodes[i][j]];
				}

				if (parsedCopy) {
					result = parsedCopy
				}
			}

			// Replace any invalid characters and put the value into cache
			const amount = Number(
				result.rawText
				.replace(",", ".")
				.replace("�", "")
				.split(" ")[0]
			);
			Cache.put(`${exchange}:${stock}`, amount, Number(process.env.CACHE_TIME) || 60 * 60 * 1000)

			return {
				stock,
				amount
			};
		})
		.catch(() => {
			Cache.put(`${exchange}:${stock}`, null, Number(process.env.CACHE_TIME) || 60 * 60 * 1000)

			return {
				stock,
				amount: null
			};
		});
}

exports.getData = getData;