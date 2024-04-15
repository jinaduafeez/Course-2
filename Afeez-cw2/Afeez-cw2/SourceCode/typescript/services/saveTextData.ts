import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { getUnixTimestampFromISO } from "../utils";
import { documentClient } from "../databaseClient";


const fetchDataAndSaveToDatabase = async (coin:string): Promise<void> => {
    
console.log(typeof getUnixTimestampFromISO)
        const apiUrl: string = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=CRYPTO:${coin}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`;
        
        try {
            const response = await fetch(apiUrl);
            const responseData: any = await response.json();
            console.log(responseData)

            if (responseData.feed && responseData.feed.length) {
                const itemsToSave = responseData.feed.slice(0, 500);

                for (const news of itemsToSave) {
                    const command = new PutCommand({
                        TableName: "CryptoNews",
                        Item: {
                            "Symbol": coin,
                            "TimePosted": getUnixTimestampFromISO(news.time_published),
                            "Content": news.summary
                        }
                    });

                    try {
                        await documentClient.send(command);
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching or parsing data:", error);
        }
    }

export default fetchDataAndSaveToDatabase;
