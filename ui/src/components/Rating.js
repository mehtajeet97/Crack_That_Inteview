import React from "react";

export const Rating = ({ idx, onChange, name }) => {
  const onRatingChange = (e) => {
    let rating = e.target.value;
    onChange(name, rating);
  };

  return (
    <div className="text-center rating rating-lg rating-half">
      <input type="radio" name={name} className="rating-hidden" value="0" />
      <input
        type="radio"
        name={name}
        className="bg-yellow-500 mask mask-star-2 mask-half-1"
        value="0.5"
        onChange={onRatingChange}
      />
      <input
        type="radio"
        name={name}
        className="bg-yellow-500 mask mask-star-2 mask-half-2"
        value="1"
        onChange={onRatingChange}
      />
      <input
        type="radio"
        name={name}
        className="bg-yellow-500 mask mask-star-2 mask-half-1"
        value="1.5"
        onChange={onRatingChange}
      />
      <input
        type="radio"
        name={name}
        className="bg-yellow-500 mask mask-star-2 mask-half-2"
        value="2"
        onChange={onRatingChange}
      />
      <input
        type="radio"
        name={name}
        className="bg-yellow-500 mask mask-star-2 mask-half-1"
        value="2.5"
        onChange={onRatingChange}
      />
      <input
        type="radio"
        name={name}
        className="bg-yellow-500 mask mask-star-2 mask-half-2"
        value="3"
        onChange={onRatingChange}
      />
      <input
        type="radio"
        name={name}
        className="bg-yellow-500 mask mask-star-2 mask-half-1"
        value="3.5"
        onChange={onRatingChange}
      />
      <input
        type="radio"
        name={name}
        className="bg-yellow-500 mask mask-star-2 mask-half-2"
        value="4"
        onChange={onRatingChange}
      />
      <input
        type="radio"
        name={name}
        className="bg-yellow-500 mask mask-star-2 mask-half-1"
        value="4.5"
        onChange={onRatingChange}
      />
      <input
        type="radio"
        name={name}
        className="bg-yellow-500 mask mask-star-2 mask-half-2"
        value="5"
        onChange={onRatingChange}
      />
    </div>
  );
};
