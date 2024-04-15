import axios from "axios";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const awsConfig = {
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
};

const dynamoDBClient = new DynamoDBClient({ region: awsConfig.region });
export const documentClient = DynamoDBDocumentClient.from(dynamoDBClient);

export const handler = async (event) => {
    for (let record of event.Records) {
        if (record.eventName === "INSERT") {
            const Symbol = record.dynamodb.NewImage.Symbol.S;
            const summaryText = record.dynamodb.NewImage.Content.S;  
            const timePosted = record.dynamodb.NewImage.TimePosted.N;
            
            //Sentiment Url provided by the module
            const sentimentApiUrl = 'https://kmqvzxr68e.execute-api.us-east-1.amazonaws.com/prod';

            try {
                const response = await axios.post(sentimentApiUrl, { text: summaryText });
                const sentiment = await response.data.sentiment;

                const putCommand = new PutCommand({
                    TableName: "Sentiment",
                    Item: {
                        "Symbol": Symbol,
                        "TimePosted": Number(timePosted),
                        "Sentiment": sentiment
                    }
                });

                await documentClient.send(putCommand);
            } catch (error) {
                console.error("Error processing record:", error);
            }
        }
    }
};
