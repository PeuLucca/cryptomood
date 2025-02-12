import React from "react";
import "./MoodSpace.css";

export default function MoodSpace({ percentage }) {
    const getEmoji = (value) => {
        if (value >= 90) return "🔥🚀"; 
        if (value >= 75) return "🚀"; 
        if (value >= 60) return "😃"; 
        if (value >= 50) return "🙂"; 
        if (value >= 40) return "😐"; 
        if (value >= 30) return "🤨"; 
        if (value >= 20) return "😟"; 
        if (value >= 10) return "😨"; 
        if (value >= 0) return "💀"; 
        return "❓";
    };

    return (
        <div className="mood-space">
            <span className="mood-emoji">{getEmoji(percentage)}</span>
            <div className="mood-text">
                <p>{percentage}% Positive</p>
                <p>Market sentiment analysis</p>
            </div>
        </div>
    );
}
