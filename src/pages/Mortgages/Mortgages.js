import React, { useState, useEffect, useContext } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
// import Fab from '@material-ui/core/Fab'


//alerts toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Loader
import Loader from '../../assets/Loader'

//icons
// import DeleteIcon from '@material-ui/icons/Delete'
// import AddIcon from '@material-ui/icons/Add'
// import EditIcon from '@material-ui/icons/Edit'
import SendIcon from '@material-ui/icons/Send';


// Modal
import ModalMortgages from './ModalMortgages'
import Alert_Dialog from '../../components/alert_dialog/Alert_Dialog'

import { Context } from "../../context/Mortgages/MortgagesContext";

const initialForm = {
  solicited_date: '',
  aproved_date: '',
  solicited_amount: '',
  aproved_amount: 0,
  InterestId: '',
  AccountId: '',
  id: null
}

const message = {
  title: 'Deleted',
  description: 'Are you sure to delete'
}


const Mortgages = () => {
  const { getMortgages, saveMortgages, state, deleteMortgages } = useContext(Context);

  //info form
  const [form, setForm] = useState(initialForm);

  //modal state vars
  const [open, setOpen] = useState(false)
  const [openD, setOpenD] = useState(false)
  const [mortgagesD, setMortgagesD] = useState(initialForm)
  const handleOpenD = () => setOpenD(true)
  const handleCloseD = () => setOpenD(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  //loading state
  const [loader, setLoader] = useState('none')
  //action state
  const [action, setAction] = useState('Create')

  const handleChange = (e) => {
    setForm({
      ...form, [e.target.name]: e.target.value
    })
    // console.log(form)
    // console.log(form)
  }

  const editData = (id) => {
    setAction('Update')
    let [mortgages] = state.mortgages.filter(el => el.id === id)
    setForm(mortgages)
    // console.log([mortgages])
    handleOpen()

  }

  const formatDate = (date) => {
    let dateF = new Date(date)
    return dateF.toLocaleString().toString().slice(0, -3)
  }

  // const setDataToDelete = (id) => {
  //   let [mortgages] = state.mortgages.filter(el => el.id === id)
  //   handleOpenD()
  //   setMortgagesD(mortgages)
  // }


  // const deleteData = () => {
  //   deleteMortgages({ id: mortgagesD.id, handleReset, setLoader });
  //   toast.success('Mortgages deleted');
  // }

  const handleReset = (e) => {
    handleClose()
    handleCloseD()
    setForm(initialForm)
    toast.success('Mortgages Accepted');
    // if (action === 'Create') {
    //   toast.success('Mortgages created');
    // }
    // if (action === 'Update') {
    //   toast.success('Mortgages updated');
    // }
  }

  useEffect(() => {
    getMortgages({ setLoader })
  }, [])


  return (
    <>
      <ToastContainer autoClose={2000} />
      <Loader display={loader} />
      <div style={{ padding: '5px' }}>
        <span style={{ fontSize: '20px' }}>Mortgages</span>
        {/* <Fab color="primary" aria-label="add" size="small"
          onClick={() => {
            handleOpen();
            setAction('Create');
            setForm(initialForm)
            // setValidate({ name: true, debterms: true, interest: true, extra_charge: true })
          }}
          style={{ float: 'right', marginBottom: '20px' }}>
          <AddIcon />
        </Fab> */}
      </div>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Solicited Date</TableCell>
              <TableCell>Aproved Date</TableCell>
              <TableCell>Solicited Amount</TableCell>
              <TableCell>Aproved Amount</TableCell>
              <TableCell>Interest</TableCell>
              <TableCell>Account</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.mortgages !== null && state.mortgages.map((mort, index) => (
              <TableRow
                key={mort.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{formatDate(mort.solicited_date)}</TableCell>
                <TableCell>{formatDate(mort.aproved_date)}</TableCell>
                <TableCell>{mort.solicited_amount}</TableCell>
                <TableCell>{mort.aproved_amount}</TableCell>
                <TableCell>{mort.Interest.name}</TableCell>
                <TableCell>{mort.Account.Client.name}</TableCell>
                <TableCell style={{ margin: '5px' }}>
                  <IconButton aria-label="edit" size="small" onClick={(e) => editData(mort.id)}>
                    <SendIcon size="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* modal */}

      <ModalMortgages
        form={form}
        handleChange={handleChange}
        action={action}
        saveData={saveMortgages}
        handleClose={handleClose}
        handleReset={handleReset}
        setLoader={setLoader}
        open={open}
      // validate={validate}
      />

      {/* <Alert_Dialog
        openD={openD}
        handleCloseD={handleCloseD}
        title={message.title}
        description={message.description}
        name={mortgagesD.name}
        deleteData={deleteData}
      /> */}

    </>
  )
}

export default Mortgages