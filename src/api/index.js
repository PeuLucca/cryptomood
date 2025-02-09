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
    const response = await fetch(`${NEWS_API_URL}?q=${query}&sortBy=relevancy&apiKey=${NEWS_API_KEY}`);
    const data = await response.json();

    return data.articles;
  } catch (error) {
    console.error('Error fetching crypto news:', error);
  }
};

export const fetchCoinGecko = async (query = 'bitcoin') => {
    try {
      const response = await fetch(`${COIN_GECKO_API_URL}/${query}/history/?date=${getDateOneYearAgo()}&localization=false`);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error fetching crypto news:', error);
    }
};

export const fetchHugginFace = async () => {
    try {
        const response = await fetch(HUGGING_FACE_API, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
            },
            body: JSON.stringify({ inputs: "This product is fantastic! It works just as advertised and I couldn't be happier." }),
          });
    
        const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error fetching crypto news:', error);
    }
};