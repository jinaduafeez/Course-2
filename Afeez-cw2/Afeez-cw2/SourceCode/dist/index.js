"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var saveTextData_1 = require("./services/saveTextData");
var dotenv = require("dotenv");
dotenv.config();
// const cryptoSymbols = [
//     "ETH",   // Ethereum
//     "ADA",   // Cardano
//     "BNB",   // Binance Coin
//     "SOL",   // Solana
//     "DOT",   // Polkadot
// ];
// saveNumericData("ADA")
// saveNumericData("BTC")
// saveNumericData("BNB")
// saveNumericData("ETH")
// saveNumericData("DOT")
// saveTextData("ADA")
(0, saveTextData_1.default)("BTC");
// saveTextData("BNB")
// saveTextData("ETH")
// saveTextData("DOT")
//# sourceMappingURL=index.js.map