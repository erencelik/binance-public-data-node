// `futures` or `spot`
const market = 'futures';

// only applicable if market parameter is `futures`
// parameter `um` for USD-M, `cm` for COIN-M
const futuresType = 'um';

const period = 'monthly'; // `monthly` or `daily`

/*
aggTrades
indexPriceKlines	
klines
markPriceKlines	
premiumIndexKlines	
trades
*/
const dataType = 'klines';

const pairs = [
    'BTCUSDT',
    'ETHUSDT',
    'AVAXUSDT',
    'SOLUSDT'
];

const intervals = [
    '12h',		
    '15m',	
    '1d',
    '1h',
    '1m',
    '1mo',	
    '1w',
    '2h',
    '30m',	
    '3d',
    '3m',
    '4h',
    '5m',
    '6h',
    '8h'
];

const years = [
    '2022',
    '2021'
];

const months = [
    '12',
    '11',
    '10',
    '09',
    '08',
    '07',
    '06',
    '05',
    '04',
    '03',
    '02',
    '01'
];

module.exports = {
    market,
    futuresType,
    period,
    dataType,
    pairs,
    intervals,
    years,
    months
};