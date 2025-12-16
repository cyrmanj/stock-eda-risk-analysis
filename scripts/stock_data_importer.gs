/**
 * Fetches historical daily stock data from Alpha Vantage and writes it
 * to the Google Sheet in a tabular, long format.
 */
function fetchStockData() {
  // --- CONFIGURATION ---
  const API_KEY = "F360ZOK6TNASHCCV"; // Your actual key
  const TICKERS = ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA"];

  // Define the spreadsheet and the target sheet.
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = "RAW_DATA";
  let sheet = ss.getSheetByName(sheetName); 

  // --- Sheet Setup Logic 
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    // Set column headers for the final cleaned data table
    sheet.appendRow(["Date", "Ticker", "Close_Price", "Volume", "Adjusted_Close"]); 
  } else {
    // Clear old data for a fresh run (keep the header row)
    sheet.getRange(2, 1, sheet.getMaxRows() - 1, sheet.getMaxColumns()).clearContent(); 
  }
  // -----------------------------------------------------------

  // base API URL and function parameters 
  const BASE_URL = "https://www.alphavantage.co/query?";
  const API_FUNCTION = "TIME_SERIES_DAILY";
  const OUTPUT_SIZE = "compact"; 

  // --- DATA FETCH LOOP ---
  for (let i = 0; i < TICKERS.length; i++) {
    const ticker = TICKERS[i];

    // Construct the complete API request URL
    const url = BASE_URL 
      + "function=" + API_FUNCTION
      + "&symbol=" + ticker
      + "&outputsize=" + OUTPUT_SIZE
      + "&apikey=" + API_KEY;

    try {
      // 1. Fetch the data from the external URL
      const response = UrlFetchApp.fetch(url);
      const json = response.getContentText();
      const data = JSON.parse(json);

    
    Logger.log("Raw JSON for " + ticker + ": " + json);

      // Check for errors (e.g., API limit reached)
      if (data["Error Message"] || data["Note"]) {
        Logger.log(`Error or limit for ${ticker}: ${json}`);
        continue; 
      }

      // The daily time series data is nested under this key
      const dailyData = data["Time Series (Daily)"];

      let rows = [];

      // 2. Loop through the data to extract the desired fields
      for (let date in dailyData) {
        const entry = dailyData[date];

        const row = [
          new Date(date), // Convert date string to a Date object
          ticker,
          parseFloat(entry["4. close"]),
          parseInt(entry["5. volume"]),
          parseFloat(entry["4. close"])
        ];
        rows.push(row);
      }

      // 3. Write all rows for this ticker to the sheet
      if (rows.length > 0) {
        // Find the next empty row to append the new data
        const startRow = sheet.getLastRow() + 1; 
        sheet.getRange(startRow, 1, rows.length, rows[0].length).setValues(rows);
        Logger.log(`Successfully imported ${rows.length} rows for ${ticker}.`);
      }

      // Respect the API rate limit (13 seconds delay)
      Utilities.sleep(13000); 

    } catch (e) {
      Logger.log(`Failed to process ${ticker}: ${e.toString()}`);
    }
  }
} 
