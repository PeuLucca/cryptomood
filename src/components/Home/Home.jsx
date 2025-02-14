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
import { fetchCryptos, fetchCryptoNews, fetchCryptoInfo } from "../../api";
import Chart from "../Chart/Chart";

export function Home() {
  const [cryptoCoin, setCryptoCoin] = useState([]);
  const [cryptoNews, setCryptoNews] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [cryptoChartData, setCryptoChartData] = useState([]);

  const handleCryptoCoin = async () => {
    try {
      const data = await fetchCryptos();
      const formattedOptions = data.map((coin) => ({
          value: coin.id,
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

  const handleFetchCryptoInfo = async () => {
    try {
      const data = await fetchCryptoInfo(selectedCoin);
      const formatMonthlyData = (prices) => {
        const monthlyData = {};
      
        prices.forEach(([timestamp, value]) => {
          const date = new Date(timestamp);
          const month = date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
      
          if (!monthlyData[month]) {
            monthlyData[month] = { total: 0, count: 0 };
          }
      
          monthlyData[month].total += value;
          monthlyData[month].count += 1;
        });
      
        return Object.entries(monthlyData).map(([month, { total, count }]) => ({
          date: month,
          mood: Math.round(total / count),
        }));
      };      
      
      setCryptoChartData(formatMonthlyData(data.prices));
    }catch(e){
      console.log(e);
    }
  };

  useEffect(() => {
    handleCryptoCoin();
  }, [])

  useEffect(() => {
    if (selectedCoin !== "") {
      // handleCryptoNews();
      handleFetchCryptoInfo();
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
              <Chart crypto={selectedCoin} data={cryptoChartData} />
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