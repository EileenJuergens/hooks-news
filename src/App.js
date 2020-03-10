/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";

export default function App() {
	const [results, setResults] = useState([]);
	const [query, setQuery] = useState('react hooks');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	// we will get back a ref object from calling the useRef() hook
	const searchInputRef = useRef()

	/* 
	*** new version ***
	*/

	useEffect(() => {
		// getResults will now be fired on componentDidMount
		getResults()
		// useEffect will be fired right after the query state has been updated
		// when we use [query] as a second parameter
		// with an empty array, we can control this behavior (-> use the button onClick to change)
	}, [])

	const getResults = async () => {
		setLoading(true);

		try {
			const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
			setResults(response.data.hits);
		}
		catch (error) {
			setError(error)
		}
		setLoading(false);
	}

	const handleSearch = (event) => {
		event.preventDefault();
		getResults();
	}

	const handleClearSearch = () => {
		setQuery('')
		// we want to focus our input, when we call handleClearSearch
		// with this, after the click of handleClearSearch we will jump back to the input field
		// so we will set the focus to the in input field
		searchInputRef.current.focus()
	}


	/* 
	*** old version ***
	
	* inside is the effect function
	* reaching out to an external API is a side effect
		useEffect(() => {
		* this is the base path 'http://hn.algolia.com/api/v1'
		* this is our query search already in the api call '...search?query=reacthooks'
		axios.get('http://hn.algolia.com/api/v1/search?query=reacthooks')
		* in order to relove our Promise we need a .then()
			.then(response => {
				setResults(response.data.hits)
			})
	* the empty array ensures the content of the effect function
	* only run on compont mount and not on any update 
	}, [])

	*/


	return (
		<div className="container max-w-md mx-auto p-4 m-2 bg-blue-lightest shadow-lg rounded">
			{/* with the form, the user can just click enter on the keybord to submit
			his request and do not have to go manually with the mouse to the button */}
			<h1 className="text-grey-darkest font-thin">Hooks News</h1>
			<form onSubmit={handleSearch} className="mb-2">
				<input
					type="text"
					onChange={event => setQuery(event.target.value)}
					value={query}
					ref={searchInputRef}
					className="border p-1 rounded"
				/>
				{/* with the form we do not need anymore an onClick on the button,
				but a onSubmit on the form.
				Plus the button type chages from type "button" to type "submit" */}
				<button type="submit" className="bg-orange rounded m-1 p-1">Search 👀 </button>
				<button
					type="button"
					onClick={handleClearSearch}
					className="bg-teal text-white rounded p-1"
				>Clear 🗑 </button>
			</form>

			{loading
				? (<div className="font-bold text-orange-dark">Loading results...</div>)
				: (<ul className="list-rest leasding-normal">
					{results.map(result => (
						<li key={result.objectID}>
							<a 
								href={result.url}
								className="text-indigo-dark hover:text-indigo-darkest"
							>{result.title}</a>
						</li>
					))}
				</ul>)
			}

			{error && (
				<div className="text-red font-bold">{error.message}</div>
			)}
		</div>
	);
}
