import saveNumericData from "./services/saveNumericData"
import saveTextData from "./services/saveTextData"
const dotenv = require("dotenv")
dotenv.config()
// const cryptoSymbols = [
//     "ETH",   // Ethereum
//     "ADA",   // Cardano
//     "BNB",   // Binance Coin
//     "SOL",   // Solana
//     "DOT",   // Polkadot
// ];

saveNumericData("ADA")
saveNumericData("BTC")
saveNumericData("BNB")
saveNumericData("ETH")
saveNumericData("DOT")

saveTextData("ADA")
saveTextData("BTC")
saveTextData("BNB")
saveTextData("ETH")
saveTextData("DOT")