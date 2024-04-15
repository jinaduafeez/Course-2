"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
var utils_1 = require("../utils");
var databaseClient_1 = require("../databaseClient");
var fetchDataAndSaveToDatabase = function (coin) { return __awaiter(void 0, void 0, void 0, function () {
    var apiUrl, response, responseData, itemsToSave, _i, itemsToSave_1, news, command, error_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(typeof utils_1.getUnixTimestampFromISO);
                apiUrl = "https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=CRYPTO:".concat(coin, "&apikey=").concat(process.env.ALPHAVANTAGE_API_KEY);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 10, , 11]);
                return [4 /*yield*/, fetch(apiUrl)];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                responseData = _a.sent();
                console.log(responseData);
                if (!(responseData.feed && responseData.feed.length)) return [3 /*break*/, 9];
                itemsToSave = responseData.feed.slice(0, 500);
                _i = 0, itemsToSave_1 = itemsToSave;
                _a.label = 4;
            case 4:
                if (!(_i < itemsToSave_1.length)) return [3 /*break*/, 9];
                news = itemsToSave_1[_i];
                command = new lib_dynamodb_1.PutCommand({
                    TableName: "CryptoNews",
                    Item: {
                        "Symbol": coin,
                        "TimePosted": (0, utils_1.getUnixTimestampFromISO)(news.time_published),
                        "Content": news.summary
                    }
                });
                _a.label = 5;
            case 5:
                _a.trys.push([5, 7, , 8]);
                return [4 /*yield*/, databaseClient_1.documentClient.send(command)];
            case 6:
                _a.sent();
                return [3 /*break*/, 8];
            case 7:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 8];
            case 8:
                _i++;
                return [3 /*break*/, 4];
            case 9: return [3 /*break*/, 11];
            case 10:
                error_2 = _a.sent();
                console.error("Error fetching or parsing data:", error_2);
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.default = fetchDataAndSaveToDatabase;
//# sourceMappingURL=saveTextData.js.map