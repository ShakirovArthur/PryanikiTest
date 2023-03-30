import CreateIcon from '@mui/icons-material/Create';
import { IconButton } from '@mui/material';
import React, { useCallback } from 'react';
import { NewDocument, Document } from '../types/Document';


export const DocumentChangeIcon = ({document, onChange}: {
	document: Document, onChange: (document: Document | NewDocument) => void
}) => {
	const handleToggleForm = useCallback(() => {
		onChange(document);
	}, []);
	return (<IconButton onClick={handleToggleForm}>
		<CreateIcon fontSize="inherit"/>
	</IconButton>);
};