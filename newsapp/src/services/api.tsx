import axios from 'axios';
export const BASE_URL = 'https://newsapi.org/v2/';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getHeadlineByCountry = async () => {
  axios
    .get(
      'https://newsapi.org/v2/top-headlines?country=in&apiKey=677afcb07c1a4acfbaf13f3c69420943'
      // 'https://newsapi.org/v2/top-headlines?country=in&apiKey=f463419c4e4c4ebd96549c95688e979b'
    )
    .then((response: any) => {
      // handle success
      return response.data;
    })
    .catch((error: any) => {
      // handle error
      console.log(error);
    });
};

export const fetchSearchDataApi = async (query: any) => {
  const API_KEY = '677afcb07c1a4acfbaf13f3c69420943';
  const key4 = '2d55f494fe674381af5e990d5d995b6e';
  const key5 = 'ac009e2e2d1b4cc3a6ec7087c51a73af';
  try {
    const data = await axios.get(
      ` https://newsapi.org/v2/everything?q=${query}&sortBy=popularity&apiKey=${API_KEY}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};


/**
 * Documentation for News API Utilities
 * 
 * Overview:
 * This file provides utility functions to interact with the News API, facilitating the fetching of top headlines
 * by country and searching for news articles based on a specific query. It uses axios for HTTP requests and is
 * designed to be imported and utilized by other parts of the application requiring news data.
 *
 * Functions:
 * - `getHeadlineByCountry`: Fetches top headlines for a specific country (India, in this case) from the News API.
 *    Returns a Promise that resolves to the response data or logs an error.
 * 
 * - `fetchSearchDataApi`: Performs a search query on the News API and returns articles based on the query's popularity.
 *    Accepts a search query string as a parameter. Returns a Promise that resolves to the response data or logs an error.
 *
 * Usage:
 * To use these functions, import them into your component or service and call them with the appropriate parameters. 
 * For example, to fetch top headlines in India:
 * 
 * ```javascript
 * import { getHeadlineByCountry } from './newsApiUtilities';
 * 
 * async function fetchHeadlines() {
 *   const headlines = await getHeadlineByCountry();
 *   console.log(headlines);
 * }
 * ```
 * 
 * To perform a search with a query:
 * 
 * ```javascript
 * import { fetchSearchDataApi } from './newsApiUtilities';
 * 
 * async function searchNews(query) {
 *   const results = await fetchSearchDataApi(query);
 *   console.log(results);
 * }
 * ```
 *
 * Note:
 * These utility functions are configured to use a static API key for the News API. In a production environment,
 * consider implementing more secure methods of storing and using API keys, such as environment variables or secure
 * vaults, especially if the application is to be deployed publicly.
 */