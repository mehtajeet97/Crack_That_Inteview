import { useState } from 'react';

export const Star = () => {
const [rating, setRating] = useState();

const displayRating = (e) => {
    console.log(e.target.value);
    setRating(e.target.value);
}

return (
  <div className="rating rating-lg rating-half">
  <input type="radio" name="rating-10" className="rating-hidden" value="0"/>
  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" value="0.5" onChange={displayRating}/>
  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" value="1" onChange={displayRating}/>
  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" value="1.5" onChange={displayRating}/>
  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" value="2" onChange={displayRating}/>
  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" value="2.5" onChange={displayRating}/>
  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" value="3" onChange={displayRating}/>
  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" value="3.5" onChange={displayRating}/>
  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" value="4" onChange={displayRating}/>
  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" value="4.5" onChange={displayRating}/>
  <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" value="5" onChange={displayRating}/>
  </div>
  )
}