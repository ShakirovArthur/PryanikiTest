import React from 'react';
import './App.css';
import { LoginPage } from './LoginPage';
import { DocumentsPage } from './DocumentsPage';
import { isAuthenticated } from '../api/PryanikyAPI';


export const App = () => {
	return (<div className="App">
		{isAuthenticated() ? <DocumentsPage/> : <LoginPage/>}
	</div>);
};


