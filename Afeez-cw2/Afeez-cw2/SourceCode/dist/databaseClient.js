"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentClient = void 0;
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
var awsConfig = {
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
};
// DynamoDB configuration
var client = new client_dynamodb_1.DynamoDBClient({ region: awsConfig.region });
exports.documentClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
//# sourceMappingURL=databaseClient.js.map