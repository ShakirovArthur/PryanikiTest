import React, { useCallback, useEffect, useState } from 'react';
import {
	Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import { DocumentEditor } from './DocumentEditor';
import { DocumentDeleteIcon } from './DocumentDeleteIcon';
import { createDocument, deleteDocumentById, changeDocument, fetchDocuments } from "../api/PryanikyAPI";
import { Document, NewDocument } from "../types/Document";
import { Loader } from "../assets/Loader";
import { DocumentChangeIcon } from "./DocumentChangeIcon";


const token: string | null = localStorage.getItem('x-auth');


const initialDocument: NewDocument = {
	companySigDate: '',
	companySignatureName: '',
	documentName: '',
	documentStatus: '',
	documentType: '',
	employeeNumber: '',
	employeeSigDate: '',
	employeeSignatureName: '',
};
export const DocumentPage = () => {
	const [documents, setDocuments] = useState<Document[]>([]);
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
	const [selectedDocument, setSelectedDocument] = useState<Document | NewDocument>();
	const [isLoading, setIsLoading] = useState<boolean>(false);


	useEffect(() => {
		setIsLoading(true);
		const token = localStorage.getItem('x-auth');
		if (token) {
			fetchDocuments(token)
				.then((response) => setDocuments(response.data))
				.catch((error) => console.error('Error fetching data:', error));
		}
		setIsLoading(false);
	}, [token]);

	const creatingNewDocument = useCallback(async (newPostData: NewDocument) => {
		setIsLoading(true);
		try {
			const response = await createDocument(newPostData);
			setDocuments([...documents, response.data]);
			setIsFormOpen(false);
		} catch (error) {
			console.error('Error creating new post:', error);
		}
		setIsLoading(false);
	}, [documents, setIsFormOpen]);

	const updateDocument = useCallback(async (document: Document) => {
		setIsLoading(true);
		try {
			const response = await changeDocument(document);
			setDocuments(documents.map((doc: Document) => doc.id === response.data.id ? response.data : doc));
		} catch (error) {
			console.error('Error updating document:', error);
		}
		setIsLoading(false);
	}, [documents, setDocuments]);

	const deleteDocument = useCallback(async (id: string): Promise<void> => {
		setIsLoading(true);
		await deleteDocumentById(id);
		const updatedDocuments = documents.filter((doc) => doc.id !== id);
		setDocuments(updatedDocuments);
		setIsLoading(false);
	}, [documents]);

	const saveDocument = useCallback(async (document: Document | NewDocument): Promise<void> => {
		setIsLoading(true);
		if ((document as Document).id !== undefined) {
			await updateDocument(document as Document);
		} else {
			await creatingNewDocument(document as NewDocument);
		}
		closeForm();
		setIsLoading(false);
	}, [creatingNewDocument, updateDocument]);

	const convertTime = useCallback((time: string): string => {
		const date = new Date(time);
		return date.toLocaleString();
	}, []);

	const toggleForm = useCallback((document: Document | NewDocument): void => {
		setIsFormOpen((prevState: boolean) => !prevState);
		setSelectedDocument(document);
	}, []);

	const closeForm = useCallback((): void => {
		setIsFormOpen(false);
	}, [setIsFormOpen]);
	const handleNewDocument = useCallback((): void => {
		toggleForm(initialDocument);
	}, []);


	return (<div>
		{isLoading ? <Loader onLoading={isLoading}/> : null}
		<TableContainer component={Paper}>
			<Table sx={{minWidth: 650}} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Дата подписи компании</TableCell>
						<TableCell align="right">Подпись компании</TableCell>
						<TableCell align="right">Название документа</TableCell>
						<TableCell align="right">Статус документа</TableCell>
						<TableCell align="right">Тип документа</TableCell>
						<TableCell align="right">Номер работника</TableCell>
						<TableCell align="right">Дата подписи сотрудника</TableCell>
						<TableCell align="right">Подпись работника</TableCell>
						<TableCell align="right">Изменить/удалить</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{documents?.map((document: Document) => (<TableRow
						key={document?.id}
						sx={{'&:last-child td, &:last-child th': {border: 0}}}
					>
						<TableCell component="th" scope="row">
							{convertTime(document?.companySigDate)}
						</TableCell>
						<TableCell align="right">{document?.companySignatureName}</TableCell>
						<TableCell align="right">{document?.documentName}</TableCell>
						<TableCell align="right">{document?.documentStatus}</TableCell>
						<TableCell align="right">{document?.documentType}</TableCell>
						<TableCell align="right">{document?.employeeNumber}</TableCell>
						<TableCell align="right">{convertTime(document?.employeeSigDate)}</TableCell>
						<TableCell align="right">{document?.employeeSignatureName}</TableCell>
						<TableCell align="right">
							<DocumentChangeIcon document={document} onToggleForm={toggleForm}/>
							<DocumentDeleteIcon id={document?.id} onDelete={deleteDocument}/>
						</TableCell>
					</TableRow>))}
				</TableBody>
			</Table>
		</TableContainer>
		<Button onClick={handleNewDocument}>Добавить запись</Button>
		{isFormOpen && selectedDocument && <DocumentEditor open={isFormOpen} onClose={closeForm} onSave={saveDocument}
                                                           document={selectedDocument} loading={isLoading}/>}
	</div>);
};

