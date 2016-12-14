import { version } from '../../package.json';
import { Router } from 'express';
var url = require('url');


// var re = /(.*)IN(.*)\("(\w+)"\)(.*)/;

// var str = 'select * from yahoo.finance.quotes where symbol IN ("GOOG") ';
// //var str = 'John IN ("Smith")';
// var newstr = str.replace(re, "$3");
// alert(newstr);

var ret_ret = {"query":{"count":1,"created":"2016-12-13T01:40:32Z","lang":"en-US","results":{"quote":{"symbol":"SPY","Ask":"226.30","AverageDailyVolume":"94667400","Bid":"226.17","AskRealtime":null,"BidRealtime":null,"BookValue":"0.00","Change_PercentChange":"+1.36 - +0.60%","Change":"+1.36","Commission":null,"Currency":"USD","ChangeRealtime":null,"AfterHoursChangeRealtime":null,"DividendShare":"4.12","LastTradeDate":"12/9/2016","TradeDate":null,"EarningsShare":"4.09","ErrorIndicationreturnedforsymbolchangedinvalid":null,"EPSEstimateCurrentYear":null,"EPSEstimateNextYear":null,"EPSEstimateNextQuarter":"0.00","DaysLow":"225.37","DaysHigh":"226.53","YearLow":"181.02","YearHigh":"226.53","HoldingsGainPercent":null,"AnnualizedGain":null,"HoldingsGain":null,"HoldingsGainPercentRealtime":null,"HoldingsGainRealtime":null,"MoreInfo":null,"OrderBookRealtime":null,"MarketCapitalization":null,"MarketCapRealtime":null,"EBITDA":null,"ChangeFromYearLow":"45.49","PercentChangeFromYearLow":"+25.13%","LastTradeRealtimeWithTime":null,"ChangePercentRealtime":null,"ChangeFromYearHigh":"-0.02","PercebtChangeFromYearHigh":"-0.01%","LastTradeWithTime":"8:00pm - <b>226.51</b>","LastTradePriceOnly":"226.51","HighLimit":null,"LowLimit":null,"DaysRange":"225.37 - 226.53","DaysRangeRealtime":null,"FiftydayMovingAverage":"217.24","TwoHundreddayMovingAverage":"214.78","ChangeFromTwoHundreddayMovingAverage":"11.73","PercentChangeFromTwoHundreddayMovingAverage":"+5.46%","ChangeFromFiftydayMovingAverage":"9.27","PercentChangeFromFiftydayMovingAverage":"+4.27%","Name":"SPDR S&P 500","Notes":null,"Open":null,"PreviousClose":"225.15","PricePaid":null,"ChangeinPercent":"+0.60%","PriceSales":null,"PriceBook":null,"ExDividendDate":null,"PERatio":null,"DividendPayDate":null,"PERatioRealtime":null,"PEGRatio":"0.00","PriceEPSEstimateCurrentYear":null,"PriceEPSEstimateNextYear":null,"Symbol":"SPY","SharesOwned":null,"ShortRatio":null,"LastTradeTime":"8:00pm","TickerTrend":null,"OneyrTargetPrice":null,"Volume":"88016926","HoldingsValue":null,"HoldingsValueRealtime":null,"YearRange":"181.02 - 226.53","DaysValueChange":null,"DaysValueChangeRealtime":null,"StockExchange":"PCX","DividendYield":"2.20","PercentChange":"+0.60%"}}}};

export default (config, db ) => {
	console.log('++++ api index.js config = ' + JSON.stringify(config));
	console.log('++++ api index.js ' + config.endpoints.length + ' endpoints declared');

	let api = Router();

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	for (var i=0; i<config.endpoints.length; i++) {
		var endpoint = config.endpoints[i];
		if (endpoint.method == 'GET') {

			if (endpoint.url == 'v1/public/yql') {
				console.log(`[bombay.js] Configuring REAL GET endpoint at ${endpoint.url}`);
				api.get('/' + endpoint.url, (req, res) => {

					console.log('extra');
					var url_parts = url.parse(req.url, true);
					console.log('url parts = ' + url_parts);
					var query = url_parts.query;
					console.log('query.q = ' + query.q);
					for (var att in query) {
						console.log('            ___ att: ' + att);
					}
					console.log('end extra');

					// res.json({ 'greeting': 'hello' });
					res.json(ret_ret);
				});
			} else {
				console.log(`[bombay.js] Configuring GET endpoint at ${endpoint.url}`);
				api.get('/' + endpoint.url, (req, res) => {
					res.json({ 'greeting': 'hello' });
				});
			}
		} else if (endpoint.method == 'POST') {
			console.log(`[bombay.js] Configuring POST endpoint at ${endpoint.url}`);			
			api.post('/' + config.endpoints[i].url, (req, res) => {
				res.json({ 'parting': 'goodbye' });
			});
		}
	}

	return api;
}


// var endpoint = 'http://localhost:3039';
// this.http.request(endpoint + '/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20IN%20(%22' + this.symbol + '%22)&format=json&env=http://datatables.org/alltables.env')
