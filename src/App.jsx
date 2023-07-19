import './App.css';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Router from './Router';

import createStore from './reducks/store/store';
import { Provider } from 'react-redux';

function App() {
	const store = createStore()
	return (
		<Provider store={store}>
		<BrowserRouter>
			<Router />
		</BrowserRouter>
		</Provider>
	);
}

export default App;