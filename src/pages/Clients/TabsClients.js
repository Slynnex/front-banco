import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../../components/Tab/TabPanel'
import TabPersonalInfo from './TabPersonalInfo';
import { Typography, MenuItem, Select,FormControl, InputLabel, Fab, Grid } from '@material-ui/core';
import TabAccount from './TabAccount';
import TabDocuments from './TabDocuments';
import TabBeneficiaries from './TabBeneficiaries';
import TabMortage from './TabMortgage';
import CancelIcon from '@material-ui/icons/Cancel'
import SaveIcon from '@material-ui/icons/Save'


const TabsClients = ({handleClient,formClient,nip,amount,setAmount,setNip,
    formBeneficiarie,handleBeneficiarie,setDialog,setCreate,updateFieldChanged,setCreditDetail,creditDetail,type,setType,
      handleMortgage,formMortgage,updateFieldGuarantees,formGuarantees,updateFieldProperties,formProperties,handleClose,validate}) => {
  const [value, setValue] = useState(0);
  
  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue);
  };



  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }


  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      height: '70vh'
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <div className='containerHeader'>
          <FormControl className='gender'>
                    <InputLabel variant="standard" required={true}>Type</InputLabel>
                    <Select id="type" name="type" onChange={(e) => setType(e.target.value)} value={type}>
                        <MenuItem value={"credit"}>Credit</MenuItem>
                        <MenuItem value={"debit"}>Debit</MenuItem>
                        <MenuItem value={"mortgages"}>Mortgage</MenuItem>
                    </Select>
          </FormControl>
          </div>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab label="Personal Information" {...a11yProps(0)} />
              <Tab label="Account" {...a11yProps(1)} />
              <Tab label="Documents" {...a11yProps(2)} />
              <Tab label="Beneficiaries" {...a11yProps(3)} disabled={type === 'debit' ?false :true}/>
              <Tab label="Mortgages" {...a11yProps(4)} disabled={type === 'mortgages' ?false :true}/>
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <TabPersonalInfo handleForm={handleClient} form={formClient}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TabAccount
              type={type}
              nip={nip}
              amount={amount}
              setAmount={setAmount}
              setNip={setNip}
              setCreditDetail={setCreditDetail}
              creditDetail={creditDetail}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <TabDocuments
              updateFieldChanged={updateFieldChanged}
            />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <TabBeneficiaries
              form={formBeneficiarie}
              handleForm={handleBeneficiarie}
            />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <TabMortage
              formMortgage={formMortgage}
              handleMortgage={handleMortgage}
              updateFieldGuarantees={updateFieldGuarantees}
              formGuarantees={formGuarantees}
              updateFieldChanged={updateFieldProperties}
              formProperties={formProperties}
              updateFieldProperties={updateFieldProperties}
            />
          </TabPanel>
      </div>
      <Grid>
            <Fab disabled={!validate} color="primary" aria-label="add" size="small" style={{float:'right',marginTop:'20px',marginRight:'10px'}}  onClick={() => setDialog(true)}>
                <SaveIcon />
            </Fab>
            <Fab color="secondary" aria-label="add" size="small" style={{float:'right',marginTop:'20px',marginRight:'10px'}}  onClick={() => handleClose()}>
                <CancelIcon />
            </Fab>
      </Grid>
    </div>
    )
}

export default TabsClients