
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from "react";
import zIndex from "@mui/material/styles/zIndex";

export const Loader = ({onLoading}:{onLoading:boolean}) => {
    const [open] = useState<boolean>(onLoading)
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};



