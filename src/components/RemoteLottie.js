// src/components/RemoteLottie.js
import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

const RemoteLottie = ({ url, style }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setAnimationData)
      .catch((err) => console.error("Failed to load Lottie:", err));
  }, [url]);

  if (!animationData) return <div className="text-gray-400 text-sm">Loading...</div>;

  return <Lottie animationData={animationData} loop autoplay style={style} />;
};

export default RemoteLottie;
