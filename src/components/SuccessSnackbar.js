import { Alert, Snackbar } from "@mui/material";

export default function SuccessSnackbar({
    message,
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
            severity="success"
            sx={{ width: '100%' }}>
            {message || "Success!"}
            </Alert>
        </Snackbar>
    );
}
