import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react";
import { Document, NewDocument } from "./types/Document";


export const DocumentEditor = ({open, onClose, onSaveDocument, document}: {
	open: boolean,
	onClose: () => void,
	onSaveDocument: (document: Document | NewDocument) => void,
	document: Document | NewDocument,
}) => {
	const [currentDocument, setCurrentDocument] = useState<Document | NewDocument>(document);

	const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
		const {name, value} = event.target;
		setCurrentDocument((prevData: any) => ({...prevData, [name]: value}));
	}, [setCurrentDocument]);

	const handleFormSubmit = useCallback((event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		onSaveDocument(currentDocument);
		onClose();
	}, [currentDocument, onClose, onSaveDocument]);

	const convertTime = useMemo(() => (time: string): string => {
		const date = new Date(time ?? '');
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		return `${year}-${month}-${day}`;
	}, []);

	return (<Dialog open={open} onClose={onClose}>
		<DialogTitle>Добавить новую запись</DialogTitle>
		<DialogContent>
			<form
				onSubmit={handleFormSubmit}>
				<TextField
					type="date"
					name="companySigDate"
					InputLabelProps={{shrink: true}}
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
					InputLabelProps={{shrink: true}}
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
