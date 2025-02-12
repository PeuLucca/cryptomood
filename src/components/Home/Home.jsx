// Core
import React, { useEffect, useState } from "react";
import Select from "react-select";

// Components
import MoodSpace from "./MoodSpace/MoodSpace";
import News from "./News/News";

// Style
import { customStyles } from "../style/select";
import "./Home.css";

// API
import { fetchCryptos, fetchCryptoNews } from "../../api";
import Chart from "../Chart/Chart";

export function Home() {
  const [cryptoCoin, setCryptoCoin] = useState([]);
  const [cryptoNews, setCryptoNews] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");

  const handleCryptoCoin = async () => {
    try {
      const data = await fetchCryptos();
      const formattedOptions = data.map((coin) => ({
          value: coin.name,
          label: (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img src={coin.image} alt={coin.name} width={20} height={20} />
              {coin.name} ({coin.symbol.toUpperCase()})
            </div>
          ),
      })); 

      setCryptoCoin(formattedOptions);
    } catch(e){
      console.log(e);
    }
  };

  const handleCryptoNews = async () => {
    try {
      const data = await fetchCryptoNews(selectedCoin);
      setCryptoNews(data);
    } catch(e){
      console.log(e);
    }
  };

  useEffect(() => {
    // handleCryptoCoin();
  }, [])

  useEffect(() => {
    if (selectedCoin !== "") {
      // handleCryptoNews(selectedCoin);
    }
  }, [selectedCoin])
  
  return (
    <div className="container">
      <div className="box-top">
        <MoodSpace percentage={54} />
      </div>
      <div className="box-bottom">
        <News crypto={selectedCoin || "bitcoin"} news={cryptoNews} />
      </div>
      <div className="box-rigth">
        <div className="content">
            <div className="content-left">
              <Chart crypto={selectedCoin} />
            </div>
            <div className="content-rigth">
              <Select
                options={cryptoCoin}
                isClearable={false}
                isSearchable
                styles={customStyles}
                isDisabled={cryptoCoin.length === 0}
                onChange={(item) => setSelectedCoin((item.value))}
              />
            </div>
        </div>
      </div>
    </div>
  )
};