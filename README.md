# PGAGI Analytics Dashboard
## Project Overview
The PGAGI Analytics Dashboard is a dynamic web application designed to provide insightful analytics across different domains by fetching real-time data from multiple APIs. It offers interactive visualizations, including weather forecasts, news updates, stock market trends, and movie details. This project integrates various APIs to deliver accurate and real-time information to users. The dashboard is built using Next.js, TypeScript, and Tailwind CSS for optimal performance and user experience.

## Features:
1. **Weather Information:** Fetch real-time weather data from OpenWeather API.
2. **News Feed:** Display latest news articles using the News API.
3. **Stock Market Analytics:** Track stock prices and financial data via Alpha Vantage.
4. **Movie Data:** View movie details and trends with TMDB API integration.
5. **Responsive Design:** Optimized for both desktop and mobile devices.
6. **Interactive Charts:** Real-time data visualization using interactive charts.

## Technologies Used
1. **Next.js:** Framework for building the application with server-side rendering.
2. **TypeScript:** A statically typed superset of JavaScript for better development experience.
3. **Tailwind CSS:** Utility-first CSS framework for styling.
4. **React:** JavaScript library for building user interfaces.
5. **Chart.js / Recharts:** Libraries for rendering interactive and customizable charts.
6. **Axios:** Promise-based HTTP client for making requests to APIs.
7. **dotenv:** Module for loading environment variables.

## Installation Instructions
### Prerequisites:
Make sure you have Node.js and npm installed. If not, you can download and install them from [here](https://nodejs.org/en/download) .

#### Steps to Set Up Locally:
1. **Clone the Repository:**

``` bash
git clone https://github.com/Zedoman/pgagi-analytics-dashboard.git
cd pgagi-analytics-dashboard
```

2. **Install Dependencies:**

Install the project dependencies using npm or yarn:

```bash
npm install
```
or
```bash
yarn install
```

3. **Set Up Environment Variables:**

Copy the .env.example file to .env and update it with the necessary API keys:



## How to Run the Project
### Development Mode:
1. **To start the development server and preview the application:**

```bash
npm run dev
```
Visit http://localhost:3000 in your browser to view the dashboard.

### Production Build:
1. **To create an optimized production build, run the following command:**

```bash
npm run build
```
After building, you can start the production server:

```bash
npm start
```

## Testing Instructions
To run the tests, make sure you have the necessary testing setup (e.g., Jest or other testing libraries). Once ready, you can execute the following command to run the tests:

```bash
npm test
```
If you are using Jest, you can view the coverage report by running:

```bash
npm run test:coverage
```

## Deployment Details

[Vercel Deployment]()

## Environment Variables
The following environment variables are required for the application to work correctly:

```bash
PORT: The port the app will run on (default is 5000).
NEXT_PUBLIC_OPENWEATHER_API_KEY: API key for OpenWeather to fetch weather data.
NEXT_PUBLIC_NEWS_API_KEY: API key for fetching news articles.
NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY: API key for Alpha Vantage to fetch stock market data.
NEXT_PUBLIC_TMDB_API_KEY: API key for The Movie Database (TMDB) to fetch movie data.
```
Ensure you replace the placeholders in the .env file with your actual API keys.
#### Note: If accessing TMDB in India use VPN.
## API Setup
### API Keys:
To use the external APIs in the project, you need to obtain API keys from the following services:

1. **OpenWeather:**

Create an account at [OpenWeather](https://openweathermap.org/api).
Obtain your API key to access weather data.

2. **News API:**

Create an account at [NewsAPI](https://newsapi.org/).
Generate an API key to fetch the latest news.

3. **Alpha Vantage:**

Create an account at [Alpha Vantage](https://www.alphavantage.co/support/#api-key).
Generate your API key to access stock market data.

4. **TMDB:**

Create an account at [TMDB](https://www.themoviedb.org/).
Get your API key and access token for movie data.

## API Configuration:
Once you have the API keys, make sure to update your .env file with the correct values.

## Additional Notes or Features
1. **The dashboard allows for easy integration of additional APIs or widgets.**
2. **Customizable charts and graphs can be added for more data visualization.**
3. **The application is fully responsive and supports various devices.**
4. **The project is optimized for performance with server-side rendering via Next.js.**

##ScreenShots of Pages:

Main Page

<img width="1680" alt="Screenshot 2025-01-07 at 00 42 40" src="https://github.com/user-attachments/assets/7240e2fe-56b4-421a-8f38-23980db4a929" />

Finance Page
<img width="1679" alt="Screenshot 2025-01-07 at 00 43 20" src="https://github.com/user-attachments/assets/2790e22f-f53f-4410-8247-ec99fbae496a" />

<img width="1673" alt="Screenshot 2025-01-07 at 00 43 38" src="https://github.com/user-attachments/assets/d2de03c3-eeec-46d9-9832-af179a74e32b" />

News Page

<img width="1680" alt="Screenshot 2025-01-07 at 00 44 04" src="https://github.com/user-attachments/assets/e2ad570e-d6dd-4cbf-b0b3-6e200c214d00" />
<img width="1672" alt="Screenshot 2025-01-07 at 00 44 29" src="https://github.com/user-attachments/assets/b26c63b2-9e22-475c-be27-3dfb6c1c3048" />
<img width="1673" alt="Screenshot 2025-01-07 at 00 44 55" src="https://github.com/user-attachments/assets/19316667-5b8d-45f6-ac62-ecd9ca04f3b7" />

Weather Page
<img width="1680" alt="Screenshot 2025-01-07 at 00 45 27" src="https://github.com/user-attachments/assets/772c4140-3484-44cc-9344-5527e47cc7e0" />

Movies Page
<img width="1680" alt="Screenshot 2025-01-07 at 00 45 52" src="https://github.com/user-attachments/assets/313990b9-68f1-41f5-9f92-1103dc6c638c" />
