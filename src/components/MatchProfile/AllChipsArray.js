// REFERENCES:
//  * https://mui.com/material-ui/react-chip/#system-ChipsArray.js

import {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function GoalSelection(props) {
  const [chipData, setChipData] = useState(props.chips);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
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
