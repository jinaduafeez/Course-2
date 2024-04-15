

interface DailyData {
  
  date: number;
  closingPrice: number;
}

interface TimeSeries {
  [date: string]: {
    "1a. open (USD)": string;
    "1b. open (USD)": string;
    "2a. high (USD)": string;
    "2b. high (USD)": string;
    "3a. low (USD)": string;
    "3b. low (USD)": string;
    "4a. close (USD)": string;
    "4b. close (USD)": string;
    "5. volume": string;
    "6. market cap (USD)": string;
  };
}



export function convertDataToDaily(data:any) {
  const timeSeries = data["Time Series (Digital Currency Daily)"];

  const dailyDataArray: DailyData[] = Object.keys(timeSeries).map((dateString) => {
    const closingPrice = parseFloat(timeSeries[dateString]["4a. close (USD)"]);
    const date: Date = new Date(dateString);
    
    return {
      date: date.valueOf(),
      closingPrice,
    };
  });

  return dailyDataArray;
}

export function getUnixTimestampFromISO(dateISO: string): number {
  const year = dateISO.substring(0, 4);
  const month = dateISO.substring(4, 6);
  const day = dateISO.substring(6, 8);
  const hours = dateISO.substring(9, 11);
  const minutes = dateISO.substring(11, 13);
  const seconds = dateISO.substring(13, 15);

  const dateString: string = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  const date: Date = new Date(dateString);

  return date.valueOf();
}

