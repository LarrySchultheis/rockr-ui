// REFERENCES:
//  * https://mui.com/material-ui/react-chip/#system-ChipsArray.js

import {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { TextField, Autocomplete, MenuItem, ListItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json"
  }
});
// export default function MultiSelect(props) {
//   return (
//     <Autocomplete
//       sx={{ m: 1, width: 500 }}
//       multiple
//       options={props?.matchProfile}
//       getOptionLabel={(option) => option}
//       disableCloseOnSelect
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           variant="outlined"
//           label="Multiple Autocomplete"
//           placeholder="Multiple Autocomplete"
//         />
//       )}
//       renderOption={(props, option, { selected }) => (
//         <MenuItem
//           {...props}
//           key={option}
//           value={option}
//           sx={{ justifyContent: "space-between" }}
//         >
//           {option}
//           {selected ? <CheckIcon color="info" /> : null}
//         </MenuItem>
//       )}
//     />
//   );
// }

// const ListItem = styled('li')(({ theme }) => ({
//   margin: theme.spacing(0.5),
// }));

export default function AllChipsArray(props) {
  const [chipData, setChipData] = useState(props?.chips);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.id !== chipToDelete.id));
    axiosInstance.delete(`${props.url}`, {
      params: {
        id: chipToDelete.id
      }
    })
    .catch(error => {
      console.log(error);
    });
  };

  useEffect(() => {
    setChipData(props?.chips);
  }, [props?.chips])

  return (
    <Paper
        elevation={0}
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            listStyle: 'none',
            background: '#f2f2f2',
            p: "1rem",
            m: 0,
        }}
        component="ul"
    >
      {chipData?.map((data) => {
        let icon;

        return (
          <ListItem key={data.id}>
            <Chip
              icon={icon}
              label={data.description}
              onDelete={handleDelete(data)}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
}
