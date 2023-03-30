import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { Button, FormControl, Grid, TextField } from '@mui/material';
import { DocumentPage } from "./DocumentTable";
import { authentication } from "../api/PryanikyAPI";
import { Loader } from "../assets/Loader";


export const LoginPage = () => {

	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleUsernameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
	}, []);

	const handlePasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	}, []);


	const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);
		setIsLoading(true);
		const {error} = await authentication(username, password);
		if (error?.message) {
			setError(error.message ? error.message : 'Unknown error');
		} else {
			setIsAuthenticated(true);
		}
		setIsLoading(false);
	}, [username, password, setIsAuthenticated, setError]);

	if (isLoading) {
		return (<div>
			<Loader onLoading={isLoading}/>
		</div>);
	}

	if (isAuthenticated) {
		return (<div>
			<DocumentPage/>
		</div>);
	}
	return (<Grid container justifyContent="center">
		<Grid item xs={12} sm={6} md={4}>
			<form onSubmit={handleSubmit}>
				<FormControl fullWidth margin="normal">
					<TextField
						id="username"
						name="username"
						label="Имя"
						value={username}
						onChange={handleUsernameChange}
						autoComplete="username"
						autoFocus
						required
						error={!!error}
						helperText={error && 'Неправильный логин или пароль'}
					/>
				</FormControl>
				<FormControl fullWidth margin="normal">
					<TextField
						id="password"
						name="password"
						type="password"
						label="Пароль"
						value={password}
						onChange={handlePasswordChange}
						autoComplete="current-password"
						required
						error={!!error}
						helperText={error && 'Неправильный логин или пароль'}

					/>
				</FormControl>
				<FormControl fullWidth margin="normal">
					<Button
						type="submit"
						variant="contained"
						color="primary"

					>
						Отправить
					</Button>
				</FormControl>
			</form>
		</Grid>
	</Grid>);
};