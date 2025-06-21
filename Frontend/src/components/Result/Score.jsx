import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Score() {
  const { state } = useLocation(), nav = useNavigate();
  return (
    <div>
      <h2>Your Score: {state?.score ?? '--'}</h2>
    </div>
  );
}
