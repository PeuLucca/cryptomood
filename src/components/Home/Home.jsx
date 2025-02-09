import "./Home.css";
import { fetchHugginFace } from "../../api";
import { useEffect } from "react";

export function Home() {

  useEffect(() => {
    fetchHugginFace();
  }, []);
  return (
    <div className="container">
      <div className="box-top">Mood Space</div>
      <div className="box-bottom">Crypto news</div>
      <div className="box-rigth">
        <div className="content">
            <div className="content-left">Chart</div>
            <div className="content-rigth">Select</div>
        </div>
      </div>
    </div>
  )
};
