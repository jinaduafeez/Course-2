import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {  DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";


let awsConfig = {
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
};


// DynamoDB configuration
const client = new DynamoDBClient({ region: awsConfig.region });
export const documentClient = DynamoDBDocumentClient.from(client);






