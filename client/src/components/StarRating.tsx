import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
}

const StarRating = ({ rating, size = 16 }: StarRatingProps) => {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((index) => {
        const starValue = index + 1;

        // Completely filled
        if (rating >= starValue) {
          return (
            <Star
              key={index}
              size={size}
              className="fill-orange-300 text-yellow-500"
            />
          );
        }

        // Half filled
        if (rating >= starValue - 0.5) {
          return (
            <div key={index} className="relative">
              {/* Empty star outline */}
              <Star size={size} className="text-yellow-500" />

              {/* Half-filled star */}
              <div className="absolute inset-0 w-1/2 overflow-hidden">
                <Star size={size} className="fill-yellow-400 text-yellow-500" />
              </div>
            </div>
          );
        }

        // Empty
        return <Star key={index} size={size} className="text-yellow-500" />;
      })}
    </div>
  );
};

export default StarRating;
