
import React, { useState, useEffect, useContext } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Fab from '@material-ui/core/Fab'

//alerts toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Loader
import Loader from '../../assets/Loader'

//icons
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'

//Modal
import ModalDenominations from './ModalDenominations';
import Alert_Dialog from '../../components/alert_dialog/Alert_Dialog'

import { Context } from '../../context/Denominations/DenominationsContext'

const initialForm = {
  id: '',
  name: '',
  value: ''
}

const validationForm = {
  id: false,
  name: false,
  value: false
}

const Denominations = () => {

  // context call
  const { getDenominations, state, saveDenominations, deleteDenomination } = useContext(Context);

  //info form
  const [form, setForm] = useState(initialForm)
  const [validate, setValidate] = useState(validationForm)


  //modal state vars
  const [open, setOpen] = useState(false)
  const [openD, setOpenD] = useState(false)
  const [denomina, setDenomina] = useState(initialForm)
  const handleOpenD = () => setOpenD(true)
  const handleCloseD = () => setOpenD(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setValidate({ id: true, name: true, value: true })
    // console.log("close")
  }
  //loading state
  const [loader, setLoader] = useState('none')
  //action state
  const [action, setAction] = useState('Create')


  const handleChange = (e) => {
    setForm({
      ...form, [e.target.name]: e.target.value
    })
    // console.log(form.id)
    if (form.id.length < 1 && form.value.length < 1 && form.name.length < 1) {
      setValidate({ id: false, name: false, value: false })
    } else {
      validateForm(form)
    }
  }

  // Validate inputs
  const validateForm = (form) => {
    const idValue = /^[a-zA-Z0-9]*$/
    const text = /^([a-zñA-ZÑ0-9\s]){0,15}[a-zñA-ZÑ0-9]$/
    const value = /^[0-9]+([.][0-9]+)?$/
    let id = idValue.test(form.id) ? true : false
    let name = text.test(form.name) ? true : false
    let num = value.test(form.value) ? true : false

    // console.log(num);
    setValidate({ id: id, name: name, value: num })
    console.log(validate)

  }

  const editData = (id) => {
    setAction('Update')
    let [denom] = state.denominations.filter(el => el.id === id)
    setForm(denom)
    handleOpen()
    setValidate({ id: true, name: true, value: true })
  }

  const setDataToDelete = (id) => {
    let [denom] = state.denominations.filter(el => el.id === id)
    handleOpenD()
    setDenomina(denom)
  }

  const deleteData = () => {
    deleteDenomination({ id: denomina.id, handleReset, setLoader });
  }

  const handleReset = (e) => {
    handleClose()
    handleCloseD()
    setForm(initialForm)

  }

  useEffect(() => {
    getDenominations({ setLoader });

  }, [])



  return (
    <>
      <ToastContainer autoClose={2000} />
      <Loader display={loader} />
      <div style={{ padding: '5px' }}>
        <span style={{ fontSize: '20px' }}>Denominations</span>
        <Fab color="primary" aria-label="add" size="small"
          onClick={() => {
            handleOpen();
            setAction('Create');
            setForm(initialForm)
            setValidate({ id: true, name: true, value: true })

          }}
          style={{ float: 'right', marginBottom: '20px' }}>
          <AddIcon />
        </Fab>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              {/* <TableCell>ID</TableCell> */}
              <TableCell>Name</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.denominations.map((denomination, index) => (
              <TableRow
                key={denomination.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                {/* <TableCell>{denomination.id}</TableCell> */}
                <TableCell>{denomination.name}</TableCell>
                <TableCell>{denomination.value}</TableCell>
                <TableCell style={{ margin: '5px' }}>
                  <IconButton aria-label="edit" size="small" onClick={(e) => editData(denomination.id)}>
                    <EditIcon size="small" />
                  </IconButton>
                  <IconButton aria-label="delete" size="small" onClick={(e) => setDataToDelete(denomination.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* modal */}

      <ModalDenominations
        form={form}
        validate={validate}
        handleChange={handleChange}
        action={action}
        saveData={saveDenominations}
        handleClose={handleClose}
        handleReset={handleReset}
        setLoader={setLoader}
        open={open}
      />
      <Alert_Dialog
        openD={openD}
        handleCloseD={handleCloseD}
        name={`${denomina.name}`}
        deleteData={deleteData}
      />

    </>
  )
}

export default Denominations