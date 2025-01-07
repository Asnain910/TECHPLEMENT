import React from "react";

const QuoteDisplay = ({ quote }) => {
  return (
    <div className="quote-display">
      <p>"{quote.text}"</p>
      <p>- {quote.author}</p>
    </div>
  );
};

export default QuoteDisplay;
