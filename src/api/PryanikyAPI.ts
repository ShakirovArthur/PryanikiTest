import { Document, NewDocument } from "../types/Document";

// NOTE: Весь код ниже можно заменить на полноценный сервис

const HOST = 'https://test.v5.pryaniky.com';

const getToken = () => localStorage.getItem('x-auth');
const setToken = (token: string) => localStorage.setItem('x-auth', token);

export const isAuthenticated = () => getToken() ? true : false;

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
		if (response.ok && answer.data) {
			const token: string = answer.data.token;
			setToken(token);
			return {isAuthenticated: true, error: undefined};
		} else {
			const error = new Error(answer.error_text);
			return {isAuthenticated: false, error};
		}
	} catch (error: any) {
		return {isAuthenticated: false, error};
	}
}

export async function fetchDocuments(): Promise<any> {
	const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/get`, {
		headers: {
			'Content-Type': 'application/json', 'x-auth': `${getToken()}`,
		},
	});
	const { data } = await response.json();
	return data as Document[];
}

export async function createDocument(newDocument: NewDocument) {
	const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/create`, {
		method: 'POST', headers: {
			'Content-Type': 'application/json', 'x-auth': `${getToken()}`,
		}, body: JSON.stringify(newDocument),
	});
	const { data } = await response.json();
	return data as Document;
}

export async function changeDocument(document: Document) {
	const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/set/${document.id}`, {
		method: 'POST', headers: {
			'Content-Type': 'application/json', 'x-auth': `${getToken()}`,
		}, body: JSON.stringify(document),
	});
	const { data } = await response.json();
	return data as Document;
}

export async function deleteDocumentById(id: string) {
	await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`, {
		method: 'DELETE', headers: {
			'x-auth': `${getToken()}`,
		},
	});
}