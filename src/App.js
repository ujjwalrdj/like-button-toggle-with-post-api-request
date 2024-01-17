import React from 'react';
import { useState } from 'react';
import './style.css';
import HeartIcon from './HeartIcon';
import SpinnerIcon from './SpinnerIcon';

export default function App() {
  const [liked, setLiked] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);

  const likeBtnHandler = async () => {
    setIsFetching(true);
    setError(null);

    try {
      const response = await fetch(
        'https://www.greatfrontend.com/api/questions/like-button',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: liked ? 'unlike' : 'like',
          }),
        }
      );
      // if (response.status >= 200 && response.status < 300) {
      console.log(response);
      if (response.ok) {
        setLiked(!liked);
      } else {
        const res = await response.json();
        setError(res.message);
        return;
      }
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <>
      <button
        disabled={isFetching}
        className={`likeBtn ${liked ? 'liked' : ''}`}
        onClick={likeBtnHandler}
      >
        {isFetching ? <SpinnerIcon /> : <HeartIcon />}
        {!liked ? 'Like' : 'Liked'}
      </button>
      {error && <div className="error">{error}</div>}
    </>
  );
}
