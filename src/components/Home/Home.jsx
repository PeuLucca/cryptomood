import React, { useEffect, useState } from "react";
import Select from "react-select";
import { customStyles } from "../style/select";
import "./Home.css";
import { fetchCryptos } from "../../api";

export function Home() {
  const [cryptoCoin, setCryptoCoin] = useState([]);

  const handleCryptoCoin = async () => {
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
  };

  useEffect(() => {
    // handleCryptoCoin();
  }, [])
  
  return (
    <div className="container">
      <div className="box-top">Mood Space</div>
      <div className="box-bottom">Crypto news</div>
      <div className="box-rigth">
        <div className="content">
            <div className="content-left">Chart</div>
            <div className="content-rigth">
                <Select
                    options={cryptoCoin}
                    isClearable
                    isSearchable
                    styles={customStyles}
                    isDisabled={cryptoCoin.length === 0}
                />
            </div>
        </div>
      </div>
    </div>
  )
};
