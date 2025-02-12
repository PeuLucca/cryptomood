// Component
import Loading from "../../Loading";

// Style
import "./News.css";

export default function News({ crypto, news }) {
  return (
    <div style={{ padding: "10px" }}>
      <h3 style={{ textTransform: "capitalize" }}>News about {crypto}</h3>
      <div className="container-news">
        {news && news.length > 0 ? (
          news.slice(0, 2).map((item, index) => (
            <div className="news" key={index}>
              <div className="news-image">
                <a href={item.url}>
                  <img
                    src={item.urlToImage}
                    alt={crypto || "bitcoin news image"}
                  />
                </a>
              </div>
              <div className="news-text-container">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <h4>{item.title}</h4>
                </a>
                <h5 style={{ fontWeight: 500 }}>{item.description}</h5>
                <h5>{item.author ? item.author : "Unknown"}</h5>
                <h5 style={{ fontSize: "10px" }}>{item.publishedAt.split("T")[0]}</h5>
              </div>
            </div>
          ))
        ) : (
          <Loading />
        )}
        {
          news && news.length > 0 ? (
            <h5 style={{ textAlign: "center", cursor: "pointer" }}>See more news...</h5>
          ) : null
        }
      </div>
    </div>
  );
}
