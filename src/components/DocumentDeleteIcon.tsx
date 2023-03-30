import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useCallback } from 'react';


export const DocumentDeleteIcon = ({id, onDelete}: {
	id: string, onDelete: (id: string) => void
}) => {
	const handleDeletePost = useCallback((): void => {
		onDelete(id);
	}, [onDelete, id]);

	return (<IconButton aria-label="delete" size="small" onClick={handleDeletePost}>
		<DeleteIcon fontSize="inherit"/>
	</IconButton>);
};
