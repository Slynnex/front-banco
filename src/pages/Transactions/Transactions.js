import React, { useEffect } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Fab} from '@material-ui/core'
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../assets/Loader'
import AddIcon from '@material-ui/icons/Add'
import { ToastContainer, toast } from 'react-toastify';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

//Modal
import ModalTransactions from './ModalTransactions';

//Import Context to use
import { Context } from '../../context/Transactions/TransactionsContext';
import { Context as ConceptContext } from '../../context/Concepts/ConceptsContext';

import {FormControl, TextField} from '@material-ui/core';
import jwt_decode from "jwt-decode";
import { set } from 'react-hook-form';


// Init the object where the input info will be saved
const initialForm = {
  date: new Date(),
  amount: '',
  concept: '',
  card_no: '',
  nip: '',
}

const Transactions = () => {
  //Set functions of context
    const { saveTransactions, getTransactions, state} = React.useContext(Context);
    const ConceptsState = React.useContext(ConceptContext);

    const [concepts, setConcepts] = React.useState([]);
    const [concept, setConcept] = React.useState('');
    const [search, setSearch] = React.useState('inicial');
    const [page, setPage] = React.useState(1);
    const [isManager, setIsManager] = React.useState(false);

    React.useEffect(()=>{
      const token = localStorage.getItem('token');
      const decode = jwt_decode(token);
      if(decode.session.rol === 'manager'){
        setIsManager(true);
      }
    },[])

    React.useEffect(()=>{
      setConcepts(ConceptsState.state.concepts);
    },[ConceptsState.state.concepts]);

    //info form
    const [form,setForm] = React.useState(initialForm)
  
    //modal state vars
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => {
      setOpen(false);
    }
    //loading state
    const [loader, setLoader] = React.useState('none')
    //action state
    const [action, setAction] = React.useState('Create')
  
  // Save data
    const handleChange = (e)=>{
      setForm({
        ...form,[e.target.name]:e.target.value
      })
      setConcept(concepts[form.concept - 1].name);
    }
  // Reset the form and modal
    const handleReset = (e)=>{
      handleClose()
      let upperConcept = concept[0].toUpperCase() + concept.slice(1);
      toast.success(upperConcept +  ' done!');
      setForm(initialForm)
    }
  // Set the transactions to show and get the concepts for the database
    React.useEffect(() => {
      getTransactions({setLoader},search,page);
      ConceptsState.getConcepts({setLoader});
    }, [search,page]);

    const formatDate = (date) => {
      let dateF = new Date(date)
      return dateF.toLocaleString().toString().slice(0,-3)
    }

    const changePage = (e) =>{
      let intPage = parseInt(e.target.textContent)
      if(e.target.textContent!=='' && e.target.type==='button' && intPage!==page){
        setPage(intPage)
      }else if(e.target.dataset.testid!==undefined){
        if(e.target.dataset.testid==="NavigateNextIcon"){
          setPage(page+1)
        }else if(e.target.dataset.testid==="NavigateBeforeIcon"){
          setPage(page-1)
        }
      }
      // console.log(e.target.textContent,e.target.dataset.testid)
    }

    return (
      <>
        <ToastContainer />
        <Loader display={loader}/>
        
        <div style={{padding:'5px'}}>
          <span style={{fontSize:'20px'}}>Transactions</span>
          <FormControl fullWidth={true} style={{marginTop:'10px',marginBottom:'20px'}}>
                    <TextField autoComplete='off'
                    label="Type account number to search"
                    name="search"
                    onChange={e => {setSearch(e.target.value)}} 
                    />
        </FormControl>
        {isManager
          ?null
          :<Fab color="primary" aria-label="add" size="small" onClick={()=>{handleOpen();setAction('Create');setForm(initialForm)}} style={{float:'right',marginBottom:'20px'}}>
            <AddIcon />
          </Fab>
        }
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Transaction concept</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Account Number</TableCell>
                <TableCell>Number</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Executive</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {!state.transactions.rows
                ? <TableRow><TableCell></TableCell></TableRow>
                : 
                state.transactions.rows.map((ex,index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{index+1}</TableCell>
                    <TableCell component="th" scope="row">
                      {ex.Concept.name}
                    </TableCell>
                    <TableCell>{ex.amount}</TableCell>
                    <TableCell>{ex.Card.Account.no_acc}</TableCell>
                    <TableCell>{ex.Card.card_number}</TableCell>
                    <TableCell>{ex.Card.Account.type}</TableCell>
                    <TableCell>{
                     formatDate(ex.date)
                    }</TableCell>
                    <TableCell>
                      {ex.Executive.name}<br></br>
                      {ex.Executive.lastname}
                    </TableCell>


                  </TableRow>
                  ))
              }
            </TableBody>
          </Table>
        </TableContainer>

     
        <Stack spacing={2} style={{marginTop:'20px'}}>
          <Pagination count={Math.ceil(state.transactions.count/5)} variant="outlined" shape="rounded" onClick={(e)=>{changePage(e)}} style={{margin:'0px',padding:'0px',display:"flex"}}/>
        </Stack>
      
        
        <ModalTransactions
            form={form}
            handleChange = {handleChange}
            action={action}
            saveData={saveTransactions}
            handleClose={handleClose}
            handleReset={handleReset}
            setLoader = {setLoader}
            setForm = {setForm}
            open={open}
            concepts = {concepts}
            state = {state}
            concept = {concept}
          />
      </>
    )
}

export default Transactions;