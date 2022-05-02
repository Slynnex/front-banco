import React, {useState, useContext,useEffect} from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../../components/Tab/TabPanel'
import { Typography, MenuItem, Select,FormControl, InputLabel, Fab, Grid } from '@material-ui/core';
import TabAccount from '../Clients/TabAccount';
import TabDocuments from '../Clients/TabDocuments';
import TabBeneficiaries from '../Clients/TabBeneficiaries';
import TabMortage from '../Clients/TabMortgage';
import CancelIcon from '@material-ui/icons/Cancel'
import SaveIcon from '@material-ui/icons/Save'
import Alert_Dialog from '../../components/alert_dialog/Alert_Dialog';
import server from '../../config/bdApi';
import { Context } from '../../context/Clients/ClientsContext'

const initialBeneficiarieForm ={
    name:"",
    lastname: "",
    relation: "",
    percentage: "",
    birth_date: "",
    phone: "",
    email: ""
}

const initialDocuments = [
    {document_url: '', type: 'ine'},{document_url: '', type: 'address'},{document_url: '', type: 'income'}
]

const initialMortgage = {
    solicited_amount: "",
    InterestId: ""
}

const initialProperties= [
    {   
        url:"",
        value:""
    }
]

const initialGuarantees = [
    {
        name:"",
        lastname: "",
        address: "",
        telephone: ""
    }

]

const Accounts = ({handleClose,id,toast}) => {
    const [value, setValue] = useState(0);
    const [type, setType] = useState('debit');
    const [nip, setNip] = useState('')
    const [amount,setAmount] = useState('');
    const [creditDetail,setCreditDetail] = useState('')
    const [formBeneficiarie, setFormBeneficiarie] = useState(initialBeneficiarieForm)
    const [formDocuments, setFormDocuments] = useState(initialDocuments)
    const [dialog, setDialog] = useState(false)
    const [formMortgage, setFormMortgage] = useState(initialMortgage);
    const [formProperties, setFormProperties] = useState(initialProperties);
    const [formGuarantees, setFormGuarantees] = useState(initialGuarantees);
    const [validate, setValidate] = useState(false);
    

    const {get} = useContext(Context)

    useEffect(() => {
        let resultAmount = false;
        let resultNip = false;
        let resultCreditDetail = false;
        let resultDocuments = true;
        let resultPropertie = true;
        let resultGuarantees = true;
        formDocuments.forEach((document) =>{                                           //Validate if is not empty the documents
            if(!Object.values(document).every((value) => value !== '')){
                resultDocuments = false;
            }
        })

        const resultBeneficiaries = Object.values(formBeneficiarie).every((value) => value !== '')//Validate if is not empty the form Beneficiaries
        const resultMortgage = Object.values(formMortgage).every((value) => value !== '');  //Validate if is not empty the form Mortgage
        formProperties.forEach((property) =>{                                           //Validate if is not empty the form Properties
            if(!Object.values(property).every((value) => value !== '')){
                resultPropertie = false;
            }
        })

        formGuarantees.forEach((guarante) =>{                                           //Validate if is not empty the form Properties
            if(!Object.values(guarante).every((value) => value !== '')){
                resultGuarantees = false;
            }
        })

        if(amount !== ''){
            resultAmount = true;}
        if(nip !== '')
            resultNip = true;
        if(creditDetail !== '')
            resultCreditDetail = true;
        
        if(type === 'debit'){
            if(resultNip && resultAmount && resultDocuments && resultBeneficiaries){
                setValidate(true);
            }else{
                setValidate(false);
            }
        }else if(type === 'credit'){
            if(resultAmount && resultCreditDetail && resultDocuments){
                setValidate(true);
            }else{
                setValidate(false);
            }
        }else if(type === 'mortgages'){
            if(resultMortgage && resultDocuments && resultPropertie && resultGuarantees){
                setValidate(true);
            }else{
                setValidate(false);
            }
        }
    },[type,formDocuments,formBeneficiarie,amount,nip,creditDetail,formMortgage,formProperties,formGuarantees])


    function a11yProps(index) {
        return {
          id: `full-width-tab-${index}`,
          'aria-controls': `full-width-tabpanel-${index}`,
        };
      }

      const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
    
      const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
          width: '100%',
          backgroundColor: theme.palette.background.paper,
          height: '70vh'
        },
      }));

      const updateFieldChanged = (index,document )=> {
        let newDocuments = [...formDocuments];
        newDocuments[index].document_url = document;
        setFormDocuments(newDocuments);
    }

    const handleBeneficiarie = (e) => {
        setFormBeneficiarie({
            ...formBeneficiarie,[e.target.name]:e.target.value
        })
    }

    const handleMortgage = (e) => {
        setFormMortgage({
            ...formMortgage, [e.target.name]: e.target.value
        })
    }

    const save = async () => {
        if(type === 'debit'){
            const form = {
                account: {
                    amount,
                    ClientId: id
                },
                beneficiaries: [
                    formBeneficiarie
                ],
                documents: formDocuments,
                card: {
                    nip
                }
            }
            try{
                await server.post(`accounts/debit`,form);
                get('inicial');  
                handleClose();
            }catch(err){
                let errors = err.response.data.message;
                errors.shift();
                errors.map((error) => (
                    console.log(error),
                    toast.error(`${error.msg} -  ${error.param}`)
                ))
            }

        }else if(type === 'credit'){
            const form = {
                account: {
                    amount,
                    ClientId: id
                },
                documents: formDocuments,
                creditdetail: {
                    CreditdetailId: creditDetail
                }
            }
            try{
                await server.post(`accounts/credit`,form);
                handleClose();
                get('inicial');  
            }catch(err){
                let errors = err.response.data.message;
                errors.shift();
                errors.map((error) => (
                    toast.error(`${error.msg} -  ${error.param}`)
                ))
            }
        }else{
            const form = {
                account: {
                    amount,
                    ClientId: id
                },
                documents: formDocuments,
                mortgage: formMortgage,
                guarantees: formGuarantees,
                properties: formProperties
            }
            try{
                await server.post(`accounts/mortgage`,form);
                handleClose();
                get('inicial');  
            }catch(err){
                let errors = err.response.data.message;
                errors.shift();
                errors.map((error) => (
                    toast.error(`${error.msg} -  ${error.param.split('[')[0]}`)
                ))
            }
        }
    }

    const updateFieldGuarantees = (index, e) => {
        let newGuarantees = [...formGuarantees];
        newGuarantees[index][e.target.name] = e.target.value;
        setFormGuarantees(newGuarantees);
    }

    const updateFieldProperties = async(index, e) => {
        if(e.target.name === 'value'){
            let newProperties = [...formProperties];
            newProperties[index][e.target.name] = e.target.value;
            setFormProperties(newProperties);
        }else{
            const files = e.target.files;
            const data = new FormData();
            data.append("file", files[0]);
            data.append("upload_preset", "lccyzc02");
            try{
                const res = await axios.post('https://api.cloudinary.com/v1_1/dnesdnfxy/image/upload',data);
                let newProperties = [...formProperties];
                newProperties[index][e.target.name] = res.data.url;
                setFormProperties(newProperties);
            }
            catch(error){
                console.log(error)
            }
        }
    }

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
                        <MenuItem value={"mortgage"}>Mortgage</MenuItem>
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
                <Tab label="Account" {...a11yProps(0)} />
                <Tab label="Documents" {...a11yProps(1)} />
                <Tab label="Beneficiaries" {...a11yProps(2)} disabled={type === 'debit' ?false :true}/>
                <Tab label="Mortgage" {...a11yProps(3)} disabled={type === 'mortgage' ?false :true}/>
            </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
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
            <TabPanel value={value} index={1}>
                <TabDocuments
                    updateFieldChanged={updateFieldChanged}
                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <TabBeneficiaries
                form={formBeneficiarie}
                handleForm={handleBeneficiarie}
                />
            </TabPanel>
            <TabPanel value={value} index={3}>
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
            <Fab color="primary" disabled={!validate} aria-label="add" size="small" style={{float:'right',marginTop:'20px',marginRight:'10px'}} onClick={() => setDialog(true)}>
                <SaveIcon />
            </Fab>
            <Fab color="secondary" aria-label="add" size="small" style={{float:'right',marginTop:'20px',marginRight:'10px'}} onClick={() => handleClose()}>
                <CancelIcon />
            </Fab>
        </Grid>
        <Alert_Dialog
            openD={dialog}
            handleCloseD={() => setDialog(false)}
            name={type}
            description={"You want to create an account type"}
            title={"Create account"}
            deleteData={save}
        />
    </div>
  )
}

export default Accounts