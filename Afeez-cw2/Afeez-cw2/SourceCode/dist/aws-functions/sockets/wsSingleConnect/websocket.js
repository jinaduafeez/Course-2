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
exports.getSendMessagePromises = void 0;
//Import functions for database
var database_1 = require("./database");
//Import API Gateway
var client_apigatewaymanagementapi_1 = require("@aws-sdk/client-apigatewaymanagementapi");
//Returns promises to send messages to all connected clients
function getSendMessagePromises(message, domain, stage) {
    return __awaiter(this, void 0, void 0, function () {
        var clientIdArray, callbackUrl, apiGwClient, msgPromiseArray;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, database_1.getConnectionIds)()];
                case 1:
                    clientIdArray = _a.sent();
                    console.log("\nClient IDs:\n" + JSON.stringify(clientIdArray));
                    console.log("domainName: " + domain + "; stage: " + stage);
                    callbackUrl = "https://".concat(domain, "/").concat(stage);
                    apiGwClient = new client_apigatewaymanagementapi_1.ApiGatewayManagementApiClient({ endpoint: callbackUrl });
                    msgPromiseArray = clientIdArray.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                        var connId, postToConnectionCommand, err_1, err_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    connId = item.ConnectionId;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 10]);
                                    console.log("Sending message '" + message + "' to: " + connId);
                                    postToConnectionCommand = new client_apigatewaymanagementapi_1.PostToConnectionCommand({
                                        ConnectionId: connId,
                                        Data: message
                                    });
                                    //Wait for API Gateway to execute and log result
                                    return [4 /*yield*/, apiGwClient.send(postToConnectionCommand)];
                                case 2:
                                    //Wait for API Gateway to execute and log result
                                    _a.sent();
                                    console.log("Message '" + message + "' sent to: " + connId);
                                    return [3 /*break*/, 10];
                                case 3:
                                    err_1 = _a.sent();
                                    console.log("Failed to send message to: " + connId);
                                    if (!(err_1.statusCode == 410)) return [3 /*break*/, 8];
                                    _a.label = 4;
                                case 4:
                                    _a.trys.push([4, 6, , 7]);
                                    return [4 /*yield*/, (0, database_1.deleteConnectionId)(connId)];
                                case 5:
                                    _a.sent();
                                    return [3 /*break*/, 7];
                                case 6:
                                    err_2 = _a.sent();
                                    console.log("ERROR deleting connectionId: " + JSON.stringify(err_2));
                                    throw err_2;
                                case 7: return [3 /*break*/, 9];
                                case 8:
                                    console.log("UNKNOWN ERROR: " + JSON.stringify(err_1));
                                    throw err_1;
                                case 9: return [3 /*break*/, 10];
                                case 10: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/, msgPromiseArray];
            }
        });
    });
}
exports.getSendMessagePromises = getSendMessagePromises;
;
//# sourceMappingURL=websocket.js.map