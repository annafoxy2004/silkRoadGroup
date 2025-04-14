import React, { useEffect, useState } from "react";

const TwentyOneMinuteTimer = () => {
    const [timeLeft, setTimeLeft] = useState(21 * 60); // 21 минуты = 1260 секунд

    useEffect(() => {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
  
    return (
        <div
        style={{
          backgroundColor: "#ffffff",
          color: "black",
          padding: "2px 2px",
          borderRadius: "20px",
          fontWeight: 500,
          fontSize: "16px",
          display: "inline-block",
          minWidth: "60px",
          textAlign: "center",
        }}
      >        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>
    );
  };

export default TwentyOneMinuteTimer;
