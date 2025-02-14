const NEWS_API_URL = 'https://newsapi.org/v2/everything';
const NEWS_API_KEY = '5f7e240b2485445d95ac987e278cfedc';
const COIN_GECKO_API_URL = 'https://api.coingecko.com/api/v3/coins';
const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english';
const HUGGING_FACE_API_KEY = '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';

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
      const coinsList = await fetch("https://api.coingecko.com/api/v3/coins/list")
      .then(res => res.json());
      const isValidCoin = coinsList.some(coin => coin.id === query);
      if (isValidCoin) {
        const response = await fetch(`${COIN_GECKO_API_URL}/${query.toLowerCase()}/market_chart?vs_currency=usd&days=365&interval=daily`);
        const data = await response.json();
        console.log(data);

        return data;
      } else {
        return null;
      }
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
        const response = await fetch(HUGGING_FACE_API_URL, {
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