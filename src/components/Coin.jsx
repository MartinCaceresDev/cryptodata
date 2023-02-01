import React from 'react';
import '../styles/coin.css';
import { Link } from 'react-router-dom'; 

export default function Coin({ coin }){
  const { name, image, symbol, current_price, market_cap, price_change_percentage_24h } = coin;

  return(
    <div className='coin-row'>
      <div className='coin-image'><img src={image} alt={name} /></div>
      <div className='coin-name'>{name}</div>
      <div className='coin-symbol'>{symbol}</div>
      <div className='coin-price'>{current_price.toFixed(2)}</div>
      <div className={ price_change_percentage_24h < 0 ? 'coin-change red' : 'coin-change green' }>{price_change_percentage_24h.toFixed(2)}</div>
      <div className='coin-market'>{market_cap.toLocaleString()}</div>
      <div className='button'>
        <Link to={`/${name}`} className='button-link'> More Info </Link>
      </div>
    </div>
  );
}