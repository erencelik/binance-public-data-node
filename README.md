# binance-public-data-node

Nodejs downloader and unzipper script for Binance Public Data.

Configure variables in `config.js`

Run `npm start`

Downloaded zip files will be under `/data/zip` and csv files will be under `/data/csv`

## Open Source Libraries

### Networking

Project uses `request` package to fetch files.

### Unzipping

Project uses `adm-zip` package to unzip files.

### File System

Project uses `fs` package to read & write files.

## TODO

Implement checksum mechanism for files.

Write test suits.
