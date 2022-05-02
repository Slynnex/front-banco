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
import ModalExecutives from './ModalExecutives';
import Alert_Dialog from '../../components/alert_dialog/Alert_Dialog'

import { Context } from '../../context/Executives/ExecutivesContext'


const initialForm = {
  name: '',
  lastname: '',
  userid: '',
  password: '',
  AreaId: '',
  BranchId: '1',
  date_init: new Date(),
  id: null
}

const validationForm = {
  name: false,
  lastname: false,
  userid: false,
  password: false,
  AreaId: false,
}

const message = {
  title: 'Deleted',
  description: 'Are you sure to delete'
}

export default function Executives() {

  const { saveExecutives, getExecutives, state, deleteExecutive } = useContext(Context);
  // console.log(state);

  //info form
  const [form, setForm] = useState(initialForm)
  const [validate, setValidate] = useState(validationForm)


  //modal state vars
  const [open, setOpen] = useState(false)
  const [openD, setOpenD] = useState(false)
  const [userD, setUserD] = useState(initialForm)
  const handleOpenD = () => setOpenD(true)
  const handleCloseD = () => setOpenD(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  //loading state
  const [loader, setLoader] = useState('none')
  //action state
  const [action, setAction] = useState('Create')

  //alert
  const notify = (message) => toast.success(message)
  const notifyE = (message) => toast.error(message)

  const handleChange = (e) => {
    setForm({
      ...form, [e.target.name]: e.target.value
    })

    if (form.name.length < 1 && form.lastname.length < 1 && form.userid.length < 1 && form.password.length < 1 && form.AreaId.length < 1 && form.BranchId.length < 1) {
      setValidate({ name: false, lastname: false, userid: false, password: false, AreaId: false })
    } else {
      validateForm(form)
    }

  }

  const validateForm = (form) => {
    const exname = /^([a-zñA-ZÑ\s]){0,55}[a-zñA-ZÑ]$/
    const text = /^([a-zñA-ZÑ0-9]){4,40}[a-zñA-ZÑ0-9]$/
    const user = /^[a-zñA-ZÑ0-9]*$/
    const pass = /^[a-z0-9_\s]{4,18}$/
    let name = exname.test(form.name) ? true : false
    let lastname = exname.test(form.lastname) ? true : false
    let userid = text.test(form.userid) ? true : false
    let password = pass.test(form.password) ? true : false
    let AreaId = user.test(form.AreaId) ? true : false

    setValidate({ name: name, lastname: lastname, userid: userid, password: password, AreaId: AreaId })
    // console.log(validate)

  }

  const editData = (id) => {
    setAction('Update')
    let [user] = state.executives.filter(el => el.id === id)
    user.password = ''
    setForm(user)
    handleOpen()
  }

  const setDataToDelete = (id) => {
    let [user] = state.executives.filter(el => el.id === id)
    handleOpenD()
    setUserD(user)
  }

  const deleteData = () => {
    deleteExecutive({ id: userD.id, handleReset, setLoader });
    toast.success('Executive deleted');
  }

  const handleReset = (e) => {
    handleClose()
    handleCloseD()
    setForm(initialForm)
    if(action === 'Update'){
      toast.success('Executive updated');
    }
    if(action === 'Create'){
      toast.success('Executive created');
    }
  }

  useEffect(() => {
    getExecutives({ setLoader });
  }, [])


  return (
    <>
      <ToastContainer autoClose={2000} />
      <Loader display={loader} />
      <div style={{ padding: '5px' }}>
        <span style={{ fontSize: '20px' }}>Executives</span>
        <Fab color="primary" aria-label="add" size="small"
          onClick={() => {
            handleOpen();
            setAction('Create');
            setForm(initialForm)
            setValidate({ name: true, lastname: true, userid: true, password: true, AreaId: true })
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
              <TableCell>Full Name</TableCell>
              <TableCell>User</TableCell>
              {/* <TableCell>Position</TableCell> */}
              <TableCell>Area</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.executives.map((ex, index) => (
              <TableRow
                key={ex.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell component="th" scope="row">
                  {`${ex.name} ${ex.lastname}`}
                </TableCell>
                <TableCell>{ex.userid}</TableCell>
                {/* <TableCell>{ex.Area.Position.name}</TableCell> */}
                <TableCell>{ex.Area.name}</TableCell>
                <TableCell style={{ margin: '5px' }}>
                  <IconButton aria-label="edit" size="small" onClick={(e) => editData(ex.id)}>
                    <EditIcon size="small" />
                  </IconButton>
                  <IconButton aria-label="delete" size="small" onClick={(e) => setDataToDelete(ex.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* modal */}

      <ModalExecutives
        form={form}
        handleChange={handleChange}
        action={action}
        // positions={state.positions}
        validate={validate}
        areas={state.areas}
        saveData={saveExecutives}
        handleClose={handleClose}
        handleReset={handleReset}
        setLoader={setLoader}
        open={open}
      />
      <Alert_Dialog
        openD={openD}
        handleCloseD={handleCloseD}
        title={message.title}
        description={message.description}
        name={`${userD.name} ${userD.lastname}`}
        deleteData={deleteData}
      />

    </>
  )
}
