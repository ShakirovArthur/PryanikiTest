import { Document, NewDocument } from "./types/Document";



const HOST = 'https://test.v5.pryaniky.com';

export async function authentication(username: string, password: string) {
	try {
		const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/login`, {
			method: 'POST', headers: {
				'Content-Type': 'application/json',
			}, body: JSON.stringify({
				username, password,
			}),
		});
		const answer = await response.json();
		if (response.ok) {
			const token: any = answer.data.token;
			localStorage.setItem('x-auth', token);
			return {isAuthenticated: true, error: undefined};
		} else {
			const error = new Error(answer.message);
			return {error, isAuthenticated: false};
		}
	} catch (error:any) {
		return {error};
	}
}

export async function fetchDocuments(token: string): Promise<any> {
	const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/get`, {
		headers: {
			'Content-Type': 'application/json', 'x-auth': `${token}`,
		},
	});
	const data = await response.json();
	return data;
}

export async function createDocument(newPostData: NewDocument): Promise<any> {
	const token = localStorage.getItem('x-auth');
	const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/create`, {
		method: 'POST', headers: {
			'Content-Type': 'application/json', 'x-auth': `${token}`,
		}, body: JSON.stringify(newPostData),
	});
	const data = await response.json();
	return data;
}

export async function documentChange(document: Document): Promise<any> {
	const token = localStorage.getItem('x-auth');
	const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/set/${document.id}`, {
		method: 'POST', headers: {
			'Content-Type': 'application/json', 'x-auth': `${token}`,
		}, body: JSON.stringify(document),
	});
	const data = await response.json();
	return data;
}

export async function deleteDocumentById(id: string): Promise<void> {
	try {
		const token = localStorage.getItem('x-auth');
		await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`, {
			method: 'DELETE', headers: {
				'x-auth': `${token}`,
			},
		});
	} catch (error) {
		console.error('Error deleting document:', error);
	}
}