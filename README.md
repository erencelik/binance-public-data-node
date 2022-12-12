# binance-public-data-node

Nodejs downloader and unzipper script for Binance Public Data.

Configure variables in `config.js`

Run `npm start`

Downloaded zip files will be under `/data/zip` and csv files will be under `/data/csv`

### Open Source Libraries

#### Networking

Project uses `request` package to fetch files.

#### Unzipping

Project uses `adm-zip` package to unzip files.

#### File System

Project uses `fs` package to read & write files.

### TODO

Implement checksum mechanism for files.

Write test suits.

## License

MIT License

Copyright (c) 2022 Hakkı Eren ÇELİK

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
