import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Fab} from '@material-ui/core'
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../assets/Loader'
import AddIcon from '@material-ui/icons/Add'
import { ToastContainer, toast } from 'react-toastify';


//Modal
import ModalTransactions from './ModalTransactions';

//Import Context to use
import { Context } from '../../context/Transactions/TransactionsContext';
import { Context as ConceptContext } from '../../context/Concepts/ConceptsContext';


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
      getTransactions({setLoader});
      ConceptsState.getConcepts({setLoader});
    }, []);

  
    return (
      <>
        <ToastContainer />
        <Loader display={loader}/>
        <div style={{padding:'5px'}}>
          <span style={{fontSize:'20px'}}>Transactions</span>
          <Fab color="primary" aria-label="add" size="small" onClick={()=>{handleOpen();setAction('Create');setForm(initialForm)}} style={{float:'right',marginBottom:'20px'}}>
            <AddIcon />
          </Fab>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Transaction concept</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Account Number</TableCell>
                <TableCell>Card Number</TableCell>
                <TableCell>Card Type</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {!state.transactions
                ? <TableRow><TableCell></TableCell></TableRow>
                : 
                state.transactions.map((ex,index) => (
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
                    <TableCell>{ex.date}</TableCell>


                  </TableRow>
                  ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        
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