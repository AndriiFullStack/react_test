import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useDebounce } from '../../utils/useDebounce';


const Home = () => {

	interface Character {
		id: number;
		name: string;
		status: string;
		species: string;
		type: string;
		gender: string;
		origin: {
			name: string;
			url: string;
		};
		location: {
			name: string;
			url: string;
		};
		image: string;
		episode: string[];
		url: string;
		created: Date;
	}

	const baseUrl: string = "https://rickandmortyapi.com/api/character";
	const [searchText, setSearchText] = useState<string>("");
	const [characters, setCharacters] = useState<Character[]>([]);
	const [showCharacters, setShowCharacters] = useState<Character[]>([])
	const [count, setCount] = useState<number>(0)
	const [pageNum, setPageNum] = useState<number>(1);

	const getData = () => {
		console.log(searchText);
		if (searchText == "") {
			setCharacters([]);
			return;
		}
		axios.get(`${baseUrl}?name=${searchText}`).then((res) => {
			console.log(res);
			setCharacters(res.data.results)
			setShowCharacters(res.data.results.slice(0,10));
			setCount(res.data.info.count);
			setPageNum(1);
		}).catch((error) => {
			setCharacters([]);
			setShowCharacters([]);
			setCount(0);
		});
	}

	const debounceGetData = useDebounce(getData, 500);

	const search = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	}
	useEffect(() => {
		debounceGetData();
	}, [searchText])

	return <div className='p-6'>
		<div className='py-6 flex flex-row justify-end items-center'>
			<label htmlFor="searchText" className='pe-3'>Search</label>
			<input
				id="searchText"
				type="text"
				value={searchText}
				onChange={search}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="Search Name"
			/>
		</div>
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
			<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-6 py-3">
							Name
						</th>
						<th scope="col" className="px-6 py-3">
							Status
						</th>
						<th scope="col" className="px-6 py-3">
							species
						</th>
					</tr>
				</thead>
				<tbody>
					{showCharacters.length > 0
						? showCharacters.map((character: Character, index) => {
							return (<tr key={character.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
								<th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									<a href={`/detail/${character.id}`} className='hover:cursor-pointer hover:underline'>
										{character.name}
									</a>
								</th>
								<td className="px-6 py-4">
									{character.status}
								</td>
								<td className="px-6 py-4">
									{character.species}
								</td>
							</tr>)
						})
						: <tr className="bg-white border-b dark:bg-gray-800 "><td className='text-center py-4' colSpan={3}>no resultls</td></tr>
					}

				</tbody>
			</table>
		</div>
		<div className="flex flex-col lg:flex-row justify-between">
			<div className="flex flex-col lg:flex-row items-center space-x-2 text-xs">
				<p className="text-gray-500 mt-4 lg:mt-0">Showing 11 to 20 of 95 entires</p>
			</div>

			<nav aria-label="Pagination" className="flex justify-center items-center text-gray-600 mt-8 lg:mt-0">
				<a href="#" className="p-2 mr-4 rounded hover:bg-gray-100">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
					</svg>
				</a>
				<a href="#" className="px-4 py-2 rounded hover:bg-gray-100"> 1 </a>
				<a href="#" className="px-4 py-2 rounded bg-gray-200 text-gray-900 font-medium hover:bg-gray-100"> 2 </a>
				<a href="#" className="px-4 py-2 rounded hover:bg-gray-100"> 3 </a>
				<a href="#" className="px-4 py-2 rounded hover:bg-gray-100"> ... </a>
				<a href="#" className="px-4 py-2 rounded hover:bg-gray-100"> 9 </a>
				<a href="#" className="p-2 ml-4 rounded hover:bg-gray-100">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
					</svg>
				</a>
			</nav>
		</div>


	</div>;
}


export default Home;