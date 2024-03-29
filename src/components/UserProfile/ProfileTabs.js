// REFERENCES: 
//      * https://mui.com/material-ui/react-tabs/#system-CustomizedTabs.js

import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import PersonalDetailsForm from './PersonalDetailsForm'
import MatchProfileForm from '../MatchProfile/MatchProfileForm';
import BandManagementForm from '../BandManagement/BandManagementForm';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <Grid
        container  
        justifyContent="flex-start"
        alignItems="flex-start"
      >
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ pl: "0.5rem" }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
      </Grid>
    );
  }

const AntTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: '#E769A6', //secondary
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  color: '#1d1247',
  '&:hover': {
    color: '#E769A6', //secondary
    opacity: 1,
  },
  '&.Mui-selected': {
    color: '#E769A6', //secondary
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

export default function ProfileTabs(props) {
  const [value, setValue] = useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const {user, axiosInstance} = props;

  return (
    <>
      <Box sx={{ width: '100%'}}>
        <Box sx={{ bgcolor: '#fff' }}>
          <AntTabs value={value} onChange={handleChange} aria-label="ant example">
            <AntTab label="Personal Details"/>
            <AntTab label="Match Profile" />
            {
              user?.is_band ?
              <AntTab label="Band Management"/>
              : <></>
            }
          </AntTabs>
          <Box />
        </Box>
      </Box> 
        <TabPanel value={value} index={0}>
            <PersonalDetailsForm
              user={user}
              axiosInstance={axiosInstance}
            />
        </TabPanel>
      <TabPanel value={value} index={1}>
          <MatchProfileForm
            user={user}
            axiosInstance={axiosInstance}
          />
      </TabPanel>
      { user?.is_band ?
        <TabPanel value={value} index={2}>
          <BandManagementForm 
            user={user}
            axiosInstance={axiosInstance}
          />
        </TabPanel>
        : <></>
      }
    </>
  );
}
