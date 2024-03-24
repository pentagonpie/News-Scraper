# News Scraper and Recommender

A news scraper and recommender system built with TypeScript and Node.js. It scrapes the HackerNews website, allowing you to choose which articles you like. Based on your preferences, 
it saves your choices locally to a CSV file and ranks future articles based on their similarity to your previous selections.

## Features

- **Web Scraping**: Scrapes the HackerNews website to fetch the latest articles and their details.
- **User Preferences**: Allows you to like or dislike articles based on your interests.
- **Local Data Storage**: Stores your article preferences in a local CSV file for future reference.
- **Recommendation Engine**: Orders and displays articles in the next run based on their similarity to your previously liked articles.

## Getting Started

1. Clone the repository: `https://github.com/pentagonpie/News-Scraper.git`
2. Install dependencies: `npm install natural figlet csv-writer csv-parse csv cheerio axios`
3. Build the project: `npm run build`
4. Start the application: `node index -option`

## Usage

1. Run the application with
  node index.js -option

![image](https://github.com/pentagonpie/News-Scraper/assets/4439355/64485d79-d7dd-4152-a4f9-674980a80ba4)


3. Like or dislike articles based on your preferences.
4. The application will save your choices in a local CSV file.
5. On the next run, with option -n to show new articles they will be ordered based on their similarity to your previously liked articles.

## Pictures
![image](https://github.com/pentagonpie/News-Scraper/assets/4439355/83c27e49-207d-48f5-a55b-70bde0822b65)
   
![image](https://github.com/pentagonpie/News-Scraper/assets/4439355/4682ec0f-a8b9-4a81-8510-2afcbaa42774)

![image](https://github.com/pentagonpie/News-Scraper/assets/4439355/28e8e524-3c4f-4935-9354-f05bbb466f94)


## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
