const NEWS_API_KEY = '5f7e240b2485445d95ac987e278cfedc';
const NEWS_API_URL = 'https://newsapi.org/v2/everything';
const COIN_GECKO_API_URL = 'https://api.coingecko.com/api/v3/coins';
const HUGGING_FACE_API = 'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english';
const HUGGING_FACE_API_KEY = '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';

const getDateOneYearAgo = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 1);
    today.setMonth(today.getMonth() + 1);

    return today.toLocaleDateString('en-GB').replace(/\//g, '-');
};

export const fetchCryptoNews = async (query = 'bitcoin') => {
  try {
    const response = await fetch(`${NEWS_API_URL}?q=${query}-crypto&sortBy=relevancy&language=en&apiKey=${NEWS_API_KEY}`);
    const data = await response.json();

    return data.articles;
  } catch (error) {
    console.error('Error fetching crypto news:', error);
  }
};

export const fetchCryptoInfo = async (query = 'bitcoin') => {
    try {
      // comparacao com outras moedas:
      // const response = await fetch(`${COIN_GECKO_API_URL}/${query}/history/?date=${getDateOneYearAgo()}&localization=false`);
      const response = await fetch(`${COIN_GECKO_API_URL}/${query}/market_chart?vs_currency=usd&days=365&interval=daily`);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error fetching crypto info:', error);
    }
};

export const fetchCryptos = async () => {
  try {
    const response = await fetch(`${COIN_GECKO_API_URL}/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching cryptos:', error);
  }
};

export const fetchHugginFace = async (query) => {
    try {
        const response = await fetch(HUGGING_FACE_API, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
            },
            body: JSON.stringify({ inputs: query }),
          });
    
        const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error getting Hugging Face API Info:', error);
    }
};