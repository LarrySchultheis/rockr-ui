// REFERENCES: 
//      * https://mui.com/material-ui/react-tabs/#system-CustomizedTabs.js

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import PersonalDetailsForm from '../UserProfile/PersonalDetailsForm'
import MatchProfileLayout from '../Match Profile/MatchProfileLayout';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ pl: "1rem" }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

const AntTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: '#E769A6',
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  color: '#1d1247',
  '&:hover': {
    color: '#E769A6',
    opacity: 1,
  },
  '&.Mui-selected': {
    color: '#E769A6',
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

export default function ProfileTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Box sx={{ width: '100%'}}>
      <Box sx={{ bgcolor: '#fff' }}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="Personal Details"/>
          <AntTab label="Match Profile" />
        </AntTabs>
        <Box />
      </Box>
    </Box>  
    <TabPanel value={value} index={0}>
        <PersonalDetailsForm />
    </TabPanel>
    <TabPanel value={value} index={1}>
        <MatchProfileLayout/>
    </TabPanel>
    </>
  );
}
