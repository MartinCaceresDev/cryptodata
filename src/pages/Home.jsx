import { useState, useEffect, useRef } from 'react';
import Coin from '../components/Coin';
import { url } from '../utils/url';
import '../styles/home.css';
import refresh from '../images/refresh.png';


export function Home() {
	const [coinsData, setCoinsData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [isError, setIsError] = useState(false);

	const input = useRef();

	const getData = async () => {
		try {
			const rawData = await fetch(url, { cors: 'no-cors' });
			const jsonData = await rawData.json();
			setCoinsData(jsonData);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsError(true);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		input.current.focus();
	});

	const handleSearch = (e) => setSearchTerm(e.target.value);

	const filterCoins = coinsData.filter(coin => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

	return (
		<div className="home-page-container">
			<div className="home-page-content">

				<h1 className="home-title">Welcome to the CryptoData</h1>

				<div className="home-search">
					<input type="text" placeholder="search for a Coin..." onChange={handleSearch} ref={input} />
					<img src={refresh} alt="search icon" onClick={getData} />
				</div>

				<main className="home-coins-data">
					{isLoading && <h2>Loading Data...</h2>}
					{isError && <h2>Data not available.</h2>}
					{isError || filterCoins.map((coin) => <Coin key={coin.name} coin={coin} />)}
				</main>
			</div>
		</div>
	);
}
