#📈 Stock Portfolio Risk and Correlation Analysis##Project OverviewThis project focuses on performing Exploratory Data Analysis (EDA) to evaluate the individual risk (volatility) and diversification potential (correlation) of a select portfolio of major technology stocks. The analysis covers historical daily returns and provides a comprehensive view of how these assets move in relation to each other.

The entire analysis workflow—from data fetching and cleaning to calculation—is automated using Google Sheets and Google Apps Script, with the final results visualized in a professional, interactive dashboard using Looker Studio.

###Technologies Used| Tool | Purpose |
| --- | --- |
| **Google Apps Script (.gs)** | Automates daily price data fetching, cleaning, and calculation of daily returns. |
| **Google Sheets** | Primary platform for data cleaning, calculating **Volatility (Annualized Standard Deviation)**, and deriving the **Correlation Matrix**. |
| **Looker Studio (Google Data Studio)** | Creates the interactive, data-driven visualizations and final dashboard. |
| **GitHub** | Version control and project documentation repository. |

---

##📊 Key Findings and MetricsThe analysis provides two primary metrics crucial for portfolio construction:

1. **Annualized Volatility:** Measures the historical risk of each individual stock. This is calculated as the annualized standard deviation of daily returns.
2. **Correlation Matrix:** Shows the linear relationship between the daily returns of every pair of assets.
* **High Positive Correlation (close to +1):** Assets move together (poor diversification).
* **Low/Negative Correlation (close to 0 or -1):** Assets move independently or inversely (good diversification).



##🚀 Access the Interactive DashboardYou can explore the final, interactive visualizations, including the Volatility Ranking and the Correlation Heatmap, by following the link below.

**[View Stock Risk Analysis Dashboard in Looker Studio](https://www.google.com/search?q=https://lookerstudio.google.com/reporting/[Your Looker Studio Report ID]/page/RAxiF)**

*(Please replace `[Your Looker Studio Report ID]` with your actual public link.)*

---

##📂 Repository StructureThis repository is organized to clearly separate the code used for data manipulation, the final results, and the supporting documentation.

```
/stock-eda-risk-analysis
├── README.md               <-- You are here! Project summary and documentation.
├── /scripts
│   └── stock_data_importer.gs  <-- Google Apps Script code for data fetching and processing.
├── /documentation
│   └── summary_metrics.xlsx  <-- Export of the final SUMMARY_METRICS sheet (Volatility & Correlation Matrix).
└── /data
    └── data_sample.csv       <-- (Optional) A small sample of the raw, cleaned data used for analysis.

```

##⚙️ How to Replicate the Analysis1. **Setup Google Sheet:** Create a new Google Sheet and paste the code from `/scripts/stock_data_importer.gs` into the Apps Script editor (`Extensions > Apps Script`).
2. **Run Script:** Run the script to populate the sheet with historical stock data and returns.
3. **Calculate Metrics:** Set up the volatility and correlation matrix formulas in the `SUMMARY_METRICS` tab as detailed in the project notes.
4. **Connect to Looker Studio:** Connect the `SUMMARY_METRICS` sheet to a new Looker Studio report and apply the pivot table/conditional formatting to visualize the results.
