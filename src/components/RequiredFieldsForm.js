// REFERENCES: 
//     * https://mui.com/material-ui/react-text-field/#system-TextFieldHiddenLabel.js
//     * https://mui.com/material-ui/react-select/#system-BasicSelect.js 

import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';


export default function RequiresFieldsForm() {
    return (
        <Stack
            component="form"
            alignItems="center"
        >
            <TextField
                hiddenLabel
                required={true}
                id="email"
                placeholder="Email Address"
                type="email"
                variant="standard"
                color="primary"
                sx ={{minWidth: "15rem", mt: "2.5rem", mb: "1.5rem"}}
            />
            <TextField
                hiddenLabel
                required={true}
                id="password"
                placeholder="Password"
                type="password"
                variant="standard"
                color="primary"
                sx ={{minWidth: "15rem"}}
            />
        </Stack>
  );
}

