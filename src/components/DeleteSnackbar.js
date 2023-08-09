import { Alert, Snackbar } from "@mui/material";

export default function DeleteSnackbar({
    component,
    open,
    handleSnackbarClose
}){
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        else handleSnackbarClose();
    }
    return(
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert
            severity="error"
            sx={{ width: '100%' }}>
            {`${component} removed.`}
            </Alert>
        </Snackbar>
    );
}
