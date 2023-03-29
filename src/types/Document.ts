export interface NewDocument {
	companySigDate: string,
	companySignatureName: string,
	documentName: string,
	documentStatus: string,
	documentType: string,
	employeeNumber: string,
	employeeSigDate: string,
	employeeSignatureName: string,
	
}

export interface Document extends NewDocument {
	id: string;
}