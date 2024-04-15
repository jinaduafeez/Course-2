import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { convertDataToDaily } from "../utils";
import { documentClient } from "../databaseClient";

interface APIDATA {
    name: string;
    date: Date;
    closingPrice: number;
}

const downloadNumericData = async (coin:string): Promise<void> => {
    

    
        const apiUrl: string = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${coin}&market=USD&apikey=${process.env.ALPHAVANTAGE_API_KEY}`;
        
        try {
            const response = await fetch(apiUrl);
            const data: Object= await response.json();

            console.log(data);
            if(!data){
                
return console.log("an error")
               
            }
            const formatData: Object[] = convertDataToDaily(data);

         // Loop through the data an save in dynamo db

            if (formatData.length > 0) {
                formatData.slice(0, 500).forEach(async (item:any) => {
                    const command = new PutCommand({
                        TableName: "ExchangeRates",
                        Item: {
                            "Symbol": coin,
                            "Time": item.date,
                            "Price": item.closingPrice
                        }
                    });

                       await documentClient.send(command);
                      
                 
                });
            }
        } catch (error) {
            console.error(error.message);
        }
    }


export default downloadNumericData;
