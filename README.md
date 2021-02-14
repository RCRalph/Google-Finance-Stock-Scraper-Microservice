Welcome to the repository. Have a nice day.

# Setup
To setup the app, run `npm install`, set the variables inside `.env` and run `npm start`.

## Variables inside `.env`
1. `APP_PORT` - the port at which the app will listen.
1. `APP_ENV` - environment of the app, for development set `local`, for production set `production`.
1. `CACHE_TIME` - amount of time in `ms` for which the values will be cached.

## `nodes.json` file
The `nodes.json` file includes an array of indeces of nodes that the scraper should look for the exchange rates. From testing, only these three patterns occur, but I might be wrong about that, so post an issue if you encounter a stock that isn't picked up by the software.

# Usage
To use this microservice, send a `GET` request to the home directory of the app and specify parameters:
- **exchange:** What stock exchange your stocks are from.
- **stocks:** What stocks do you want to get. You can get more than one stock with one call by separating the values with a comma (`,`).

If the stock wasn't found, the output value will equal to `null`. To debug this data, go to Google and search for `<your stock exchange>:<your stock>`, example `nasdaq:tsla`. The page should output a chart and the current exchange rate.

# Example
Call `http://localhost:3000/?exchange=nasdaq&stocks=tsla,amzn,msft,aapl` will output:
```json
{
	"tsla": 816.12,
	"amzn": 3277.71,
	"msft": 244.99,
	"aapl": 135.37
}
```

# Reporting issues
If the data you've inserted is 100% correct and you've checked it with Google, where it works fine, open an issue on GitHub and include which stock causes the app to fail. It will be fixed asap.

# Disclaimer
This software is for personal-usage only and should not be used for any kind of trading. The delay between the current and served values is greater or equal to the Google's delay, which is already pretty huge. The only purpose of this software is to give a illustrative value of exchange rates of stocks, that's why the caching and other delays. The app isn't meant to steal Google's data, only to present it in a way that can be useful to some people. The creator of the software doesn't take any responsibilities about the software's reliability nor anything related to it.