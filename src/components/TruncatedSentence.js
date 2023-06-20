import React, { useState } from 'react';

const TruncatedSentence = ({ sentence, maxLength }) => {
    const [isTruncated, setIsTruncated] = useState(true);
  
    const toggleTruncation = () => {
      setIsTruncated(!isTruncated);
    };
  
    const truncatedText = isTruncated ? sentence.slice(0, maxLength) : sentence;
  
    return (
      <p>
        {truncatedText}
        {sentence.length > maxLength && (
          <span onClick={toggleTruncation}>
            {isTruncated ? '... Read more' : ' Read less'}
          </span>
        )}
      </p>
    );
};
export default TruncatedSentence;