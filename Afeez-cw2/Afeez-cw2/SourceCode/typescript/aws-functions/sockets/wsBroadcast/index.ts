//Import external library with websocket functions
import { getSendMessagePromises } from "./websocket";
import {getData} from "./database"
export const handler = async (event) => {
    const domain = "oa4yaqfqw1.execute-api.us-east-1.amazonaws.com"
    const stage =   "prod"
    try {     
      const data = await getData("ADA") 
         //Get promises to send messages to connected clients
         let sendMsgPromises = await getSendMessagePromises(JSON.stringify(data), domain, stage);
         //Execute promises
         await Promise.all(sendMsgPromises);  
    }
    catch(err){
        return { statusCode: 500, body: "Error: " + JSON.stringify(err) };
    }
    //Success
    return { statusCode: 200, body: "Data sent successfully." };
};







