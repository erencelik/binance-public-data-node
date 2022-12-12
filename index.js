const request = require('request');
const AdmZip = require("adm-zip");
const fs = require('fs');
const path = require('path');

const baseUrl = 'https://data.binance.vision';

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

const zipRootFolder = path.join(__dirname, 'data/zip');
const csvRootFolder = path.join(__dirname, 'data/csv');

async function start() {
    
    if (!fs.existsSync(zipRootFolder)) {
        fs.mkdirSync(zipRootFolder);
    }

    if (!fs.existsSync(csvRootFolder)) {
        fs.mkdirSync(csvRootFolder);
    }

    let url = `${baseUrl}/data/${market}`;

    if (market === 'futures') {
        url += `/${futuresType}`;
    }

    url += `/${period}/${dataType}`;

    for (var i = 0; i < pairs.length; i++) {

        const symbol = pairs[i];

        for (var j = 0; j < intervals.length; j++) {

            const interval = intervals[j];

            for (var k = 0; k < years.length; k++) {

                const year = years[j];

                for (var l = 0; l < months.length; l++) {

                    const month = months[l];

                    const file = `${symbol}-${interval}-${year}-${month}`;

                    url += `/${symbol}/${interval}/${file}.zip`;

                    const zipPath = await getzip(url, symbol, file);

                    await unzip(zipPath, symbol, file);

                }

            }

        }

    }

}

async function getzip(url, symbol, file) {

    console.log(`Downloading from: ${url}`);
    
    const response = await request(url);

    const zipFolder = path.join(zipRootFolder, symbol);

    if (!fs.existsSync(zipFolder)) {
        fs.mkdirSync(zipFolder);
    }

    const zipPath = path.join(zipFolder, `${file}.zip`);

    const stream = fs.createWriteStream(zipPath);

    response.pipe(stream);

    await new Promise(fulfill => stream.on('finish', fulfill));

    return zipPath;

}

async function unzip(zipPath, symbol, file) {

    const zip = new AdmZip(zipPath);

    const entries = zip.getEntries();

    for (var i = 0; i < entries.length; i++) {

        const entry = entries[i];

        const csvFolder = path.join(csvRootFolder, symbol);

        if (!fs.existsSync(csvFolder)) {
            fs.mkdirSync(csvFolder);
        }

        const csvFileName = `${file}.csv`;

        await zip.extractEntryTo(entry, csvFolder, false, true, csvFileName);

    }

}

start();