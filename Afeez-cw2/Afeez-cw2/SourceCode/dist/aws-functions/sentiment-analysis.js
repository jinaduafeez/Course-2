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
exports.handler = exports.documentClient = void 0;
var axios_1 = require("axios");
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
var awsConfig = {
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
};
var dynamoDBClient = new client_dynamodb_1.DynamoDBClient({ region: awsConfig.region });
exports.documentClient = lib_dynamodb_1.DynamoDBDocumentClient.from(dynamoDBClient);
var handler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, _a, record, Symbol_1, summaryText, timePosted, sentimentApiUrl, response, sentiment, putCommand, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _i = 0, _a = event.Records;
                _b.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 8];
                record = _a[_i];
                if (!(record.eventName === "INSERT")) return [3 /*break*/, 7];
                Symbol_1 = record.dynamodb.NewImage.Symbol.S;
                summaryText = record.dynamodb.NewImage.Content.S;
                timePosted = record.dynamodb.NewImage.TimePosted.N;
                sentimentApiUrl = 'https://your-sentiment-api-url';
                _b.label = 2;
            case 2:
                _b.trys.push([2, 6, , 7]);
                return [4 /*yield*/, axios_1.default.post(sentimentApiUrl, { text: summaryText })];
            case 3:
                response = _b.sent();
                return [4 /*yield*/, response.data.sentiment];
            case 4:
                sentiment = _b.sent();
                putCommand = new lib_dynamodb_1.PutCommand({
                    TableName: "Sentiment",
                    Item: {
                        "Symbol": Symbol_1,
                        "TimePosted": Number(timePosted),
                        "Sentiment": sentiment
                    }
                });
                return [4 /*yield*/, exports.documentClient.send(putCommand)];
            case 5:
                _b.sent();
                return [3 /*break*/, 7];
            case 6:
                error_1 = _b.sent();
                console.error("Error processing record:", error_1);
                return [3 /*break*/, 7];
            case 7:
                _i++;
                return [3 /*break*/, 1];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.handler = handler;
//# sourceMappingURL=sentiment-analysis.js.map