import React, { useState, useEffect, useRef } from 'react';
import '../styles/home.css';
import Coin from '../components/Coin';
import refresh from '../images/refresh.png'

export default function Home() {
	const [coinsData, setCoinsData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [isError, setIsError] = useState(false);

	const input = useRef();

	const getData = async () => {
		try {
			const rawData = await fetch(
				'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
			);
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

	const filterCoins = coinsData.filter((coin) => {
		return coin.name.toLowerCase().includes(searchTerm.toLowerCase());
	});

	return (
		<div className="home-page-container">
			<div className="home-page-content">
				<div className="home-title">
					<h1>Welcome to the CryptoData</h1>
				</div>
				<div className="home-search">
					<input
						type="text"
						placeholder="search for a Coin..."
						onChange={handleSearch}
						ref={input}
					/>
					<img
						src={refresh}
						alt="search icon"
						onClick={getData}
					/>
				</div>
				<div className="home-coins-data">
					{isLoading && <h2>Loading Data...</h2>}
					{isError && <h2>Data not available.</h2>}
					{isError ||
						filterCoins.map((coin) => <Coin key={coin.name} coin={coin} />)}
				</div>
			</div>
		</div>
	);
}
