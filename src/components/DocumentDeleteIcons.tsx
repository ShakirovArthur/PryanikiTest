import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useCallback } from "react";


export const DeleteDocument = ({id, onDeleteDocument}: {
	id: string, onDeleteDocument: (id: string) => void
}) => {
	const handleDeletePost = useCallback((): void => {
		onDeleteDocument(id);
	}, [onDeleteDocument, id]);

	return (<IconButton aria-label="delete" size="small" onClick={handleDeletePost}>
		<DeleteIcon fontSize="inherit"/>
	</IconButton>);
};
