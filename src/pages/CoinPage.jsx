import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { url } from '../utils/url';
import '../styles/coinPage.css';


export function CoinPage() {
  const { coinID } = useParams();
  const [coinsData, setCoinsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getData = async () => {
    try {
      const rawData = await fetch(url);
      const jsonData = await rawData.json();
      setCoinsData(jsonData);
      setIsLoading(false);
    }
    catch (error) {
      console.log(error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [coinID])

  const pageCoin = coinsData.filter(coin => coin.name === coinID);
  const [coin] = pageCoin;

  if (!isError && !isLoading) {
    return (
      <div className='coinpage-container'>
        <div className='coinpage-content'>
          <div className='coinpage-title'>
            <h1>{coinID}</h1>
          </div>
          <div className='coinpage-image'>
            <img src={coin.image} alt={coin.name} />
          </div>
          <div className='coinpage-data'>
            <div className='coinpage-data-row'>
              <div className='coinpage-data-header'>
                Symbol:
              </div>
              <div className='coinpage-data-value-symbol'>
                {coin.symbol}
              </div>
            </div>
            <div className='coinpage-data-row'>
              <div className='coinpage-data-header'>
                Current Price:
              </div>
              <div className='coinpage-data-value'>
                {coin.current_price.toLocaleString()}
              </div>
            </div>
            <div className='coinpage-data-row'>
              <div className='coinpage-data-header'>
                Market Cap:
              </div>
              <div className='coinpage-data-value'>
                {coin.market_cap.toLocaleString()}
              </div>
            </div>
            <div className='coinpage-data-row'>
              <div className='coinpage-data-header'>
                Total Volume:
              </div>
              <div className='coinpage-data-value'>
                {coin.total_volume.toLocaleString()}
              </div>
            </div>
            <div className='coinpage-data-row'>
              <div className='coinpage-data-header'>
                24hr High:
              </div>
              <div className='coinpage-data-value green'>
                {coin.high_24h.toLocaleString()}
              </div>
            </div>
            <div className='coinpage-data-row'>
              <div className='coinpage-data-header'>
                24hr Low:
              </div>
              <div className='coinpage-data-value red'>
                {coin.low_24h.toLocaleString()}
              </div>
            </div>
          </div>
          <div className='coinpage-button'>
            <Link to={'/'}>GO BACK</Link>
          </div>
        </div>
      </div>
    );
  }
  else if (isLoading) {
    return (
      <div className='coinpage-container'>
        <div className='coinpage-content'>
          <div className='coinpage-title'>
            <h1>{coinID}</h1>
          </div>
          <div className='loading'>Loading Data...</div>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className='coinpage-container'>
        <div className='coinpage-content'>
          <div className='coinpage-title'>
            <h1>{coinID}</h1>
          </div>
          <div className='error'>
            Data not available.
          </div>
          <div className='coinpage-button'>
            <Link to={'/'}>back</Link>
          </div>
        </div>
      </div>
    );
  }
}