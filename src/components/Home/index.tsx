import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useDebounce } from '../../utils/useDebounce';
import userSearchStore from '../../store/searchStore';

import { Character } from '../../utils/type';
import CharacterRow from './CharacterRow';



const Home = () => {

	const baseUrl: string = "https://rickandmortyapi.com/api/character";
	const { searchText, setSearchText } = userSearchStore((state) => state);
	const { characters, setCharacters } = userSearchStore((state) => state);
	const { showCharacters, setShowCharacters } = userSearchStore((state) => state);
	const { count, setCount } = userSearchStore((state) => state);
	const { pageNum, setPageNum } = userSearchStore((state) => state);
	const { totalPageCount, setTotalPageCount } = userSearchStore((state) => state);
	const [flag, setFlag] = useState(false);
	const [loading, setLoading] = useState(false);

	const getData = () => {
		if (searchText == "") {
			setCharacters([]);
			setShowCharacters([]);
			setCount(0);
			return;
		}
		setLoading(true);
		axios.get(`${baseUrl}?name=${searchText}`).then((res) => {
			setCharacters(res.data.results)
			setShowCharacters(res.data.results.slice(0, 10));
			setCount(res.data.info.count);
		}).then(() => { setLoading(false) }).catch((error) => {
			setCharacters([]);
			setShowCharacters([]);
			setCount(0);
		});
	}

	const moveToPage = (page: number) => {
		const oddIndex = page % 2;
		const startIndex = oddIndex == 1 ? 0 : 10;
		if (Math.ceil(page / 2) != Math.ceil(pageNum / 2)) {
			setLoading(true);
			axios.get(`${baseUrl}?name=${searchText}&page=${Math.floor((page - 1) / 2) + 1}`).then((res) => {
				setCharacters(res.data.results)
				const endIndex = oddIndex == 1 ? 10 : res.data.results.length;
				setShowCharacters(res.data.results.slice(startIndex, endIndex));
				setCount(res.data.info.count);
				setPageNum(page);
			}).then(() => { setLoading(false) }).catch((error) => {
				setCharacters([]);
				setShowCharacters([]);
				setCount(0);
			});
		} else {
			const endIndex = oddIndex == 1 ? 10 : characters.length;
			setShowCharacters(characters.slice(startIndex, endIndex));
			setPageNum(page);
		}
	}

	const debounceGetData = useDebounce(getData, 500);

	const search = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	}

	useEffect(() => {
		setTimeout(() => {
			setFlag(true);
		}, 500)
	}, [])

	useEffect(() => {
		if (flag) {
			debounceGetData();
		}
	}, [searchText])

	useEffect(() => {
		if (flag) {
			setPageNum(1);
			setTotalPageCount(Math.ceil(count / 10));
		}
	}, [count]);

	return (
		<div className='p-6'>
			<div className='py-6 flex flex-row justify-end items-center'>
				<label htmlFor="searchText" className='pe-3 dark:text-white'>Search</label>
				<input
					id="searchText"
					type="text"
					value={searchText}
					onChange={search}
					className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Search Name"
				/>
			</div>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[calc(100vh-190px)]">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 h-full overflow-auto">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white border-b-2">
						<tr>
							<th scope="col" className="px-6 py-3 text-center">
								Name
							</th>
							<th scope="col" className="px-6 py-3 text-center">
								Status
							</th>
							<th scope="col" className="px-6 py-3 text-center">
								Species
							</th>
							<th scope="col" className="px-6 py-3 text-center">
								Thumbnails
							</th>
						</tr>
					</thead>

					<tbody>
						{loading
						? <tr className="bg-white dark:bg-gray-800 "><td className='text-center py-4' colSpan={4}>loding...</td></tr>
						:showCharacters.length > 0
							? showCharacters.map((character: Character, index) => {
								return <CharacterRow key={character.id} character={character} />
							})
							: <tr className="bg-white dark:bg-gray-800 "><td className='text-center py-4' colSpan={4}>no resultls</td></tr>
						}

					</tbody>
				</table>
			</div>
			<div className="flex flex-col lg:flex-row justify-between mt-3">
				<div className="flex flex-col lg:flex-row items-center space-x-2 text-xs">
					<p className="text-gray-500 mt-4 lg:mt-0">Showing {(pageNum - 1) * 10 + 1} to {Math.min(pageNum * 10, count)} of {count} entires</p>
				</div>
				<nav aria-label="Pagination" className="flex justify-center items-center text-gray-600 mt-8 lg:mt-0">
					<a onClick={() => { pageNum > 1 && moveToPage(pageNum - 1) }} className={`p-2 mr-4 cursor-pointer rounded${pageNum > 1 ? ' hover:bg-gray-100' : ' cursor-default'}`}>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
						</svg>
					</a>
					{pageNum > 2 && <a onClick={() => moveToPage(1)} className="px-4 py-2 rounded cursor-pointer hover:bg-gray-100"> 1 </a>}
					{pageNum > 3 && <a className="px-4 py-2 rounded cursor-pointer hover:bg-gray-100"> ... </a>}
					{pageNum > 1 && <a onClick={() => moveToPage(pageNum - 1)} className="px-4 py-2 rounded cursor-pointer hover:bg-gray-100"> {pageNum - 1} </a>}
					<a className="px-4 py-2 rounded cursor-pointer bg-gray-200 text-gray-900 font-medium hover:bg-gray-100"> {pageNum} </a>
					{pageNum < totalPageCount && <a onClick={() => moveToPage(pageNum + 1)} className="px-4 py-2 rounded cursor-pointer hover:bg-gray-100"> {pageNum + 1} </a>}
					{pageNum < totalPageCount - 2 && <a className="px-4 py-2 rounded cursor-pointer hover:bg-gray-100"> ... </a>}
					{pageNum < totalPageCount - 1 && <a onClick={() => moveToPage(totalPageCount)} className="px-4 py-2 rounded cursor-pointer hover:bg-gray-100"> {totalPageCount} </a>}
					<a onClick={() => { pageNum < totalPageCount && moveToPage(pageNum + 1) }} className={`p-2 cursor-pointer ml-4 rounded${pageNum < totalPageCount ? ' hover:bg-gray-100' : ' cursor-default'}`}>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
						</svg>
					</a>
				</nav>
			</div>
		</div>
	);
}


export default Home;