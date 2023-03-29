import React from 'react';
import './App.css';
import { LoginPage } from "./components/LoginPage";
import { DocumentPage } from "./components/DocumentTable";


function App() {
	const token = localStorage.getItem('x-auth');
	return (<div className="App">
		{token ? <DocumentPage/> : <LoginPage/>}
	</div>);
}

export default App;
