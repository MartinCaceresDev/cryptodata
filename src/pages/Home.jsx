import { useState, useEffect, useRef } from 'react';
import useSWRImmutable from 'swr/immutable';
import Coin from '../components/Coin';
import { url } from '../utils/url';
import { getData } from '../utils/getData';
import '../styles/home.css';


export function Home() {

	const { data: coinsData, error, isLoading } = useSWRImmutable(url, getData);

	const [searchTerm, setSearchTerm] = useState('');

	const input = useRef();

	useEffect(() => input.current.focus());

	const handleSearch = (e) => setSearchTerm(e.target.value);

	let content;

	if (isLoading) {
		content = <h2>Loading Data...</h2>;
	} else if (error) {
		content = <h2>Data not available.</h2>;
	} else {
		const filterCoins = coinsData.filter(coin => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
		content = (
			<div className='home-coins-data-grid'>{filterCoins.map(coin => <Coin key={coin.name} coin={coin} />)}</div>
		);
	}

	return (
		<div className="home-page-container">
			<div className="home-page-content">

				<h1 className="home-title">Welcome to CryptoData</h1>

				<div className="home-search">
					<input type="text" placeholder="search for a Coin..." onChange={handleSearch} ref={input} />
				</div>

				<main className="home-coins-data">
					{content}
				</main>
			</div>
		</div>
	);
}
