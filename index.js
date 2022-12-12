const request = require('request');
const AdmZip = require("adm-zip");
const fs = require('fs');
const path = require('path');

const { market, futuresType, period, dataType, pairs, intervals, years, months } = require('./config');

const baseUrl = 'https://data.binance.vision';

const rootDataFolder = path.join(__dirname, 'data');
const zipRootFolder = path.join(rootDataFolder, 'zip');
const csvRootFolder = path.join(rootDataFolder, 'csv');

async function start() {
    
    createFoldersIfNotExists();

    for (var i = 0; i < pairs.length; i++) {

        const symbol = pairs[i];

        for (var j = 0; j < intervals.length; j++) {

            const interval = intervals[j];

            for (var k = 0; k < years.length; k++) {

                const year = years[j];

                for (var l = 0; l < months.length; l++) {

                    const month = months[l];

                    const file = `${symbol}-${interval}-${year}-${month}`;

                    const url = constructUrl(symbol, interval, file);

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

function createFoldersIfNotExists() {

    if (!fs.existsSync(rootDataFolder)) {
        fs.mkdirSync(rootDataFolder);
    }

    if (!fs.existsSync(zipRootFolder)) {
        fs.mkdirSync(zipRootFolder);
    }

    if (!fs.existsSync(csvRootFolder)) {
        fs.mkdirSync(csvRootFolder);
    }

}

function constructUrl(symbol, interval, file) {

    let url = `${baseUrl}/data/${market}`;

    if (market === 'futures') {
        url += `/${futuresType}`;
    }

    url += `/${period}/${dataType}/${symbol}/${interval}/${file}.zip`;

    return url;

}

start();