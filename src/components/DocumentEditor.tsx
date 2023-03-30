import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { Document, NewDocument } from '../types/Document';
import { Loader } from '../assets/Loader';

const dateLabelProps = { shrink: true };

export const DocumentEditor = ({onSave, onClose, document, isSaving}: {
	onClose: () => void,
	onSave: (document: Document | NewDocument) => void,
	document: Document | NewDocument,
	isSaving: boolean
}) => {
	const [currentDocument, setCurrentDocument] = useState(document);

	const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const {name, value} = event.target;
		setCurrentDocument((prevData: any) => ({...prevData, [name]: value}));
	}, [setCurrentDocument]);

	const handleFormSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSave(currentDocument);
	}, [currentDocument, onSave]);

	const convertTime = useCallback((time: string) => {
		const date = new Date(time);
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		return `${year}-${month}-${day}`;
	}, []);

	return (
			<Dialog open={true}>
				<DialogTitle>Добавить новую запись</DialogTitle>
				<DialogContent>
					{isSaving && <Loader />}
					<form
						onSubmit={handleFormSubmit}>
						<TextField
							type="date"
							name="companySigDate"
							InputLabelProps={dateLabelProps}
							label="Дата подписания компании"
							value={convertTime(currentDocument?.companySigDate)}
							onChange={handleChange}
							fullWidth
							margin="normal"
							required
						/>
						<TextField
							name="companySignatureName"
							label="Имя подписавшего представителя компании"
							value={currentDocument?.companySignatureName}
							onChange={handleChange}
							fullWidth
							margin="normal"
							required
						/>
						<TextField
							name="documentName"
							label="Название документа"
							value={currentDocument?.documentName}
							onChange={handleChange}
							fullWidth
							margin="normal"
							required
						/>
						<TextField
							name="documentStatus"
							label="Статус документа"
							value={currentDocument?.documentStatus}
							onChange={handleChange}
							fullWidth
							margin="normal"
							required
						/>
						<TextField
							name="documentType"
							label="Тип документа"
							value={currentDocument?.documentType}
							onChange={handleChange}
							fullWidth
							margin="normal"
							required
						/>
						<TextField
							name="employeeNumber"
							label="Номер сотрудника"
							value={currentDocument?.employeeNumber}
							onChange={handleChange}
							fullWidth
							margin="normal"
							required
						/>
						<TextField
							name="employeeSigDate"
							type="date"
							InputLabelProps={dateLabelProps}
							label="Дата подписи сотрудника"
							value={convertTime(currentDocument?.employeeSigDate)}
							onChange={handleChange}
							fullWidth
							margin="normal"
							required
						/>
						<TextField
							name="employeeSignatureName"
							label="Имя подписавшего представителя сотрудника"
							value={currentDocument?.employeeSignatureName}
							onChange={handleChange}
							fullWidth
							margin="normal"
							required
						/>
						<DialogActions>
							<Button onClick={onClose}>Отмена</Button>
							<Button type="submit" color="primary">Сохранить</Button>
						</DialogActions>
					</form>
				</DialogContent>
			</Dialog>);
};
