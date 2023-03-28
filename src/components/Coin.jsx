import { Link } from 'react-router-dom';
import '../styles/coin.css';

export default function Coin({ coin }) {
  const { name, image, symbol, current_price, market_cap, price_change_percentage_24h } = coin;

  return (
    <article className='coin-row'>
      <img className='coin-image' src={image} alt={name} />
      <span className='coin-name'>{name}</span>
      <span className='coin-symbol'>{symbol}</span>
      <span className='coin-price'>{current_price.toFixed(2)}</span>
      <span className={price_change_percentage_24h < 0 ? 'coin-change red' : 'coin-change green'}>
        {price_change_percentage_24h.toFixed(2)}
      </span>
      <span className='coin-market'>{market_cap.toLocaleString()}</span>
      <Link to={`/${name}`} className='button-link'> More Info </Link>
    </article>
  );
}