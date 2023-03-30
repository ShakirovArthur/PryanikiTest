import React, { useCallback, useEffect, useState } from 'react';
import {
	Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import { DocumentEditor } from './DocumentEditor';
import { DocumentDeleteIcon } from './DocumentDeleteIcon';
import { createDocument, deleteDocumentById, changeDocument, fetchDocuments } from '../api/PryanikyAPI';
import { Document, NewDocument } from '../types/Document';
import { Loader } from '../assets/Loader';
import { DocumentChangeIcon } from './DocumentChangeIcon';


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

const tableStyle = { minWidth: 650 };

const rowStyle = { border: 0 };

export const DocumentsPage = () => {
	const [documents, setDocuments] = useState<Document[]>([]);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [selectedDocument, setSelectedDocument] = useState<Document | NewDocument>();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetchDocuments()
			.then((documents) => setDocuments(documents))
			.catch((error) => console.error('Error fetching data:', error));
		setIsLoading(false);
	}, []);

	const createNewDocument = useCallback(async (newPostData: NewDocument) => {
		setIsLoading(true);
		try {
			const document = await createDocument(newPostData);
			setDocuments([...documents, document]);
			setIsFormOpen(false);
		} catch (error) {
			console.error('Error creating new document: ', error);
		}
		setIsLoading(false);
	}, [documents, setIsFormOpen]);

	const updateDocument = useCallback(async (document: Document) => {
		setIsLoading(true);
		try {
			const updatedDocument = await changeDocument(document);
			setDocuments(documents.map((doc: Document) => doc.id === updatedDocument.id ? updatedDocument : doc));
		} catch (error) {
			console.error('Error updating document:', error);
		}
		setIsLoading(false);
	}, [documents, setDocuments]);

	const handleDelete = useCallback(async (id: string) => {
		setIsLoading(true);
		try {
			await deleteDocumentById(id);
			const updatedDocuments = documents.filter((doc) => doc.id !== id);
			setDocuments(updatedDocuments);
		} catch (error) {
			console.error('Error deleting document:', error);
		}
		setIsLoading(false);
	}, [documents]);

	const handleSave = useCallback(async (document: Document | NewDocument) => {
		setIsLoading(true);
		if ('id' in document && document.id) {
			await updateDocument(document);
		} else {
			await createNewDocument(document);
		}
		closeForm();
		setIsLoading(false);
	}, [createNewDocument, updateDocument]);

	const convertTime = useCallback((time: string) => {
		const date = new Date(time);
		return date.toLocaleString();
	}, []);

	const toggleForm = useCallback((document: Document | NewDocument) => {
		setIsFormOpen((prevState: boolean) => !prevState);
		setSelectedDocument(document);
	}, []);

	const closeForm = useCallback(() => {
		setIsFormOpen(false);
	}, [setIsFormOpen]);

	const handleNewDocument = useCallback(() => {
		toggleForm(initialDocument);
	}, []);

	return (<>
		{isLoading && <Loader />}
		<TableContainer component={Paper}>
			<Table sx={tableStyle} aria-label="simple table">
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
						sx={{'&:last-child td, &:last-child th': rowStyle}}
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
							<DocumentChangeIcon document={document} onChange={toggleForm}/>
							<DocumentDeleteIcon id={document?.id} onDelete={handleDelete}/>
						</TableCell>
					</TableRow>))}
				</TableBody>
			</Table>
		</TableContainer>
		<Button onClick={handleNewDocument}>Добавить запись</Button>
		{isFormOpen && selectedDocument && <DocumentEditor onClose={closeForm} onSave={handleSave}
                                                           document={selectedDocument} isSaving={isLoading}/>}
	</>);
};

