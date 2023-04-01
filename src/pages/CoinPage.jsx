import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { url } from '../utils/url';
import '../styles/coinPage.css';

const backgroundImg = { backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/almacenamiento-test-55848.appspot.com/o/crypto-app%2Fcrypto.jpg?alt=media&token=59eef821-7f33-4af2-afe0-346785b4d4ce')" };

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
    } catch (error) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    };
  };

  useEffect(() => {
    getData();
  }, [coinID])

  const [coin] = coinsData.filter(coin => coin.name === coinID);

  if (isLoading) {
    return (
      <div className='coinpage-container' style={backgroundImg}>
        <div className='coinpage-content'>
          <h1 className='coinpage-title'>{coinID}</h1>
          <div className='loading'>Loading Data...</div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='coinpage-container' style={backgroundImg}>
        <div className='coinpage-content'>
          <h1 className='coinpage-title'>{coinID}</h1>
          <div className='error'>Data not available.</div>
          <Link to={'/'} className='coinpage-button'>back</Link>
        </div>
      </div>
    );
  }

  return (
    <div className='coinpage-container' style={backgroundImg}>
      <div className='coinpage-content'>

        <h1 className='coinpage-title'>{coinID}</h1>
        <img src={coin.image} alt={coin.name} className='coinpage-image' />

        <div className='coinpage-data'>
          <div>
            <span>Symbol:</span>
            <span>{coin.symbol}</span>
          </div>
          <div>
            <span>Current Price:</span>
            <span className='coinpage-data-value'>{coin.current_price.toLocaleString()}</span>
          </div>
          <div>
            <span>Market Cap:</span>
            <span className='coinpage-data-value'>{coin.market_cap.toLocaleString()}</span>
          </div>
          <div>
            <span>Total Volume:</span>
            <span className='coinpage-data-value'>{coin.total_volume.toLocaleString()}</span>
          </div>
          <div>
            <span>24hr High:</span>
            <span className='coinpage-data-value green'>{coin.high_24h.toLocaleString()}</span>
          </div>
          <div>
            <span>24hr Low:</span>
            <span className='coinpage-data-value red'>{coin.low_24h.toLocaleString()}</span>
          </div>
        </div>
        <Link to={'/'} className='coinpage-button'>GO BACK</Link>
      </div>
    </div>
  );
}