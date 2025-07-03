import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={16} fill="currentColor" className="text-yellow-400" />
      ))}
      {hasHalfStar && <Star key="half" size={16} fill="url(#half-gradient)" className="text-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={16} className="text-gray-300" />
      ))}
      {/* SVG for half star gradient fill */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="half-gradient">
            <stop offset="50%" stopColor="gold" />
            <stop offset="50%" stopColor="lightgray" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
export default StarRating;