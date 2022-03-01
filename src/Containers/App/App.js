import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

//Components
import DisplayFeedbacks from '../../Components/DisplayFeedbacks/DisplayFeedbacks';

const App = () => {
	const [lang, setLang] = useState();
	const [data, setData] = useState([]);

	useEffect(() => {
		axios.get('https://api.imcas.com/v1/feedbacks').then(response => {
			setData(response.data.data);
			console.log(response.data.data);
		});
	}, []);

	return (
		<>
			<header>
				<h1>Test React - IMCAS</h1>
				<select
					name='language'
					id='language'
					onChange={e => setLang(e.target.value)}
				>
					<option value='en' default>
						English
					</option>
					<option value='fr'>French</option>
					<option value='ru'>Russian</option>
					<option value='es'>Spanish</option>
					<option value='zh'>Chinese</option>
				</select>
			</header>
			<main>
				<BrowserRouter>
					<Routes>
						<Route
							exact
							path='/'
							element={
								<DisplayFeedbacks
									language={lang}
									data={data}
									single={false}
								/>
							}
						/>
						<Route
							exact
							path='/feedbacks'
							element={
								<DisplayFeedbacks
									language={lang}
									data={data}
									single={false}
								/>
							}
						/>
						<Route
							exact
							path='/feedbacks/:id'
							element={
								<DisplayFeedbacks
									language={lang}
									data={data}
									single={true}
								/>
							}
						/>
					</Routes>
				</BrowserRouter>
			</main>
		</>
	);
};

export default App;
