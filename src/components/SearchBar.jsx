import { useState } from "react";
import { Search } from "lucide-react";
import { debounce } from "lodash";
import { useCallback } from "react";

const SearchBar = ({ onSearch, searchQuery = "" }) => {
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			onSearch(e.target.value);
		}
	};

	const debouncedSearch = useCallback(
		debounce((q) => {
			onSearch(q);
		}, 50),
		[]
	);

	const handleChange = (e) => {
		const q = e.target.value;
		debouncedSearch(q);
	};

	return (
		<div className='relative w-2/3 flex items-center border border-gray-300 rounded-md shadow-sm bg-white'>
			<Search className='absolute left-3 text-black w-5 h-5' />
			<input
				type='text'
				value={searchQuery}
				onChange={(e) => handleChange(e)}
				onKeyDown={handleKeyDown}
				className='w-full pl-10 pr-4 py-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white'
				placeholder='Search for topics, for e.g. politics'
			/>
		</div>
	);
};

export default SearchBar;
