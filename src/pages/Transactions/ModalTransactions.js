import React from 'react';
import {FormControl, InputLabel, Input, MenuItem, Select, Box, Grid, Typography, Modal, TextField} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Style of the modal
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #cecece',
    borderRadius:10,
    boxShadow: '10px 5px 5px',
    p: 4,
};

const ModalTransactions = ({form,handleChange,action,saveData,handleClose,open,handleReset,setLoader, concepts, state, setForm, concept}) => {

    // Set all the states to work with
    const [account, setAccount] = React.useState('');
    const [flag, setFlag] = React.useState(false);
    const [flag2, setFlag2] = React.useState(false);
    const [flag3, setFlag3] = React.useState(false);
    const [errors, setErrors] = React.useState('');
    const [display, setDisplay] = React.useState('flex');
    const [accountType, setaccountType] = React.useState('');
    const [newConcepts, setnewConcepts] = React.useState([]);
    const [block, setBlock] = React.useState(true);


// Search account in database with the card number
    const searchAcount = () =>{
        axios.get('https://bancomex-improving.herokuapp.com/api/v1/transactions/client/' + form.card_no)
        .then(function (response) {
            if(response.data.data === null){
                setFlag(true);
                setAccount('');
                setaccountType('');
                setBlock(true);
            } else{
                setAccount(response.data.data.Account.Client);
                setaccountType(response.data.data.Account.type);
                setFlag(false);
                setBlock(false);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
// Set new concepts array to show the correct ones depends of the type of account
    React.useEffect(()=>{
        if(accountType === 'debit'){
            setnewConcepts(concepts.filter(obj => obj.name === 'withdraw' || obj.name === 'deposit' ));
        }
        if(accountType === 'credit' || accountType === 'mortgage'){
            setnewConcepts(concepts.filter(obj => obj.name === 'payment'));
        }
    },[accountType]);

// Set the errors 
    React.useEffect(()=>{
        setErrors(state.errors.message);
    },[state]);
// Validate the input fields when the errors change
    React.useEffect(()=>{
        if(errors === 'invalid card number or nip'){
            setFlag2(true);
        }
        if(errors === 'Invalid amount'){
            setFlag3(true);
        }
        if(typeof errors === 'string'){
            if(errors.length > 0){
                toast.error(errors);
            }
        }
    },[errors]);

// Actions to do when click on the save button.
    const actions = () =>{
        if(form.card_no.length === 0 || form.concept.length === 0 || form.amount.length === 0 || form.nip.length === 0){
            toast.error('Complete all the fields');
        }else{
            saveData({form,id:form.id,setLoader,handleReset});
            setAccount(''); 
            setaccountType('');
            setFlag2(false);
            setFlag3(false);
        }
    }
// Display the correct concepts
    React.useEffect(()=>{
        if(form.concept === 1){
            setDisplay('flex');
        }else{
            setDisplay('None');
            setForm({
                ...form, nip: 11
              })
        }
        
    },[form.concept])
    
  return (
      <>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            {`${action} Transaction`}
            </Typography>
            <FormControl fullWidth={true}>
            {flag 
            ?   <FormControl fullWidth={true}>
                    <TextField
                    error
                    id="standard-error-helper-text"
                    label="Error"
                    helperText="Acount Incorrect."
                    name="card_no"
                    onChange={handleChange} 
                    value={form.card_no} 
                    onBlur={searchAcount}
                    />
                </FormControl>
            :   <FormControl fullWidth={true}>
                    <TextField
                    id="standard-error-helper-text"
                    label="Card Number"
                    name="card_no"
                    onChange={handleChange} 
                    value={form.card_no} 
                    onBlur={searchAcount}
                    />
                </FormControl>
            } 
            </FormControl>
            <FormControl fullWidth={true}>
            <InputLabel variant="standard" required={true}>Concept</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name = 'concept'
                value={form.concept}
                label="Age"
                onChange={handleChange}
            >
                {newConcepts.map((obj, index)=>{
                    return (
                        <MenuItem value={newConcepts[index].id} key = {concepts[index].id}>{newConcepts[index].name}</MenuItem>
                    )
                })}
                <MenuItem value={4} key = {4}>opening</MenuItem>
            </Select>
            </FormControl>
            <FormControl fullWidth={true}>
            {flag3 
            ?   <FormControl fullWidth={true}>
                    <TextField
                    error
                    id="standard-error-helper-text"
                    label="Error"
                    helperText="Invalid Amount."
                    name="amount"
                    onChange={handleChange} 
                    onKeyDown={()=>setErrors('')}
                    value={form.amount} 
                    type="text"
                    />
                </FormControl>
            :   <FormControl fullWidth={true}>
                    <TextField
                        id="amount"
                        label="Amount"
                        name="amount"
                        onChange={handleChange} 
                        value={form.amount} 
                        type="text"
                    />
                </FormControl>
            } 
            </FormControl>
            <FormControl fullWidth={true}>
            {flag2 
            ?   <FormControl fullWidth={true}>
                    <TextField
                    error
                    id="standard-error-helper-text"
                    label="Error"
                    helperText="NIP Incorrect."
                    name="nip"
                    onChange={handleChange} 
                    onKeyDown={()=>setErrors('')}
                    value={form.nip} 
                    type="password"
                    />
                </FormControl>
            :   <FormControl fullWidth={true}>
                    <TextField
                        id="nip"
                        label="NIP"
                        name="nip"
                        onChange={handleChange} 
                        value={form.nip} 
                        type="password"
                        style={{display: display}}
                    />
                </FormControl>
            } 
            </FormControl>
            {account
            ? 
            <>
                <Typography id="modal-modal-title" variant="subtitle1" component="h6">
                    Name: {account.name} {account.lastname}
                </Typography>
                <Typography id="modal-modal-title" variant="subtitle1" component="h6">
                    CURP: {account.curp}
                </Typography>
                <Typography id="modal-modal-title" variant="subtitle1" component="h6">
                    Account Type: {accountType}
                </Typography>
            </>
            : 
            <></>
            }
            <Grid>
            <Fab onClick={actions} color="primary" aria-label="add" size="small" style={{float:'right',marginTop:'20px',marginRight:'10px'}} disabled={block}>
                <SaveIcon />
            </Fab>
            <Fab onClick={()=>{handleClose(); setAccount(''); setaccountType('')}} color="secondary" aria-label="add" size="small" style={{float:'right',marginTop:'20px',marginRight:'10px'}}>
                <CancelIcon />
            </Fab>
            </Grid>
        </Box>
    </Modal>
    </>
  )
}

export default ModalTransactions;