import CreateIcon from "@mui/icons-material/Create";
import { IconButton } from "@mui/material";
import React, { useCallback } from "react";
import { NewDocument,Document } from "../types/Document";


export const DocumentChange = ({document, onToggleForm}: {
	document: Document,
	onToggleForm: (document: Document | NewDocument) => void
}) => {
	const handleToggleForm = useCallback(() => {
		onToggleForm(document);
	}, []);
	return (<IconButton onClick={handleToggleForm}>
			<CreateIcon fontSize="inherit"/>
		</IconButton>);
};