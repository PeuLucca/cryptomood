const NEWS_API_URL = 'https://newsapi.org/v2/everything';
const NEWS_API_KEY = '5f7e240b2485445d95ac987e278cfedc';
const COIN_GECKO_API_URL = 'https://api.coingecko.com/api/v3/coins';
const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english';
const HUGGING_FACE_API_KEY = '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';

export const fetchCryptoNews = async (query = 'bitcoin') => {
  try {
    const response = await fetch(`${NEWS_API_URL}?q=${query}-crypto&sortBy=relevancy&language=en&pageSize=18&apiKey=${NEWS_API_KEY}`);
    const data = await response.json();

    return data.articles;
  } catch (error) {
    console.error('Error fetching crypto news:', error);
  }
};

export const fetchCryptoInfo = async (query = 'bitcoin') => {
    try {
      const coinsList = await fetch("https://api.coingecko.com/api/v3/coins/list")
      .then(res => res.json());
      const isValidCoin = coinsList.some(coin => coin.id === query);
      if (isValidCoin) {
        const response = await fetch(`${COIN_GECKO_API_URL}/${query.toLowerCase()}/market_chart?vs_currency=usd&days=300&interval=daily`);
        const data = await response.json();

        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching crypto info:', error);
    }
};

export const fetchCryptoComparison = async () => {
  try {
    const response = await fetch(`${COIN_GECKO_API_URL}/markets?vs_currency=usd`);
    const data = await response.json();

    return data;
  } catch(e){
    console.error(e);
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

export const analyzeCryptoSentiment = async (crypto = 'bitcoin', news) => {
  try {
    if (!news || news.length === 0) {
      console.warn('Nenhuma notícia encontrada para a moeda:', crypto);
      return null;
    }

    const sentimentPromises = news.map(async (article) => {
      const text = `${article.title}. ${article.description}`;
      return fetchHugginFace(text);
    });

    const sentimentResults = await Promise.all(sentimentPromises);

    let positiveCount = 0;
    let total = 0;

    sentimentResults.forEach((sentiment) => {
      if (sentiment && sentiment[0]) {
        const scorePositive = sentiment[0][0].score;

        positiveCount += scorePositive;
        total++;
      }
    });

    if (total === 0) {
      console.warn('Nenhum dado de sentimento retornado.');
      return null;
    }

    return {
      positiveCount: (( positiveCount / total ) * 100).toFixed(1),
      analyzedArticles: total,
    };
  } catch (error) {
    console.error('Erro ao analisar sentimento:', error);
  }
};
