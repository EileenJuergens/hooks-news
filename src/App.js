import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function App() {
	const [results, setResults] = useState([])

	// inside is the effect function
	// reaching out to an external API is a side effect
	useEffect(() => {
		// this is the base path 'http://hn.algolia.com/api/v1'
		// this is our query search already in the api call '...search?query=reacthooks'
		axios.get('http://hn.algolia.com/api/v1/search?query=reacthooks')
			// in order to relove our Promise we need a .then()
			.then(response => {
				setResults(response.data.hits)
			})
		// the empty array ensures the content of the effect function
		// only run on compont mount and not on any update 
	}, [])

	return (
		<>
			<ul>
				{results.map(result => (
					<li key={result.objectID}>
						<a href={result.url}>{result.title}</a>
					</li>

				))}
			</ul>
		</>
	);
}
