import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Fab} from '@material-ui/core'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../assets/Loader'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'

//Modal
import ModalCommissions from './ModalCommissions';
import Alert_Dialog from '../../components/alert_dialog/Alert_Dialog'

import { Context } from '../../context/Commissions/CommissionsController';


const initialForm = {
  name:'',
  amount:0,
  date_init:new Date(),
  id:null
}

const Commissions = () => {
    const { saveCommissions, getCommissions, state, deleteCommissions} = React.useContext(Context);
    //info form
    const [form,setForm] = React.useState(initialForm)
  
    //modal state vars
    const [open, setOpen] = React.useState(false)
    const [openD, setOpenD] = React.useState(false)
    const [userD, setUserD] = React.useState(initialForm)
    const handleOpenD = () => setOpenD(true)
    const handleCloseD = () => setOpenD(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    //loading state
    const [loader, setLoader] = React.useState('none')
    //action state
    const [action, setAction] = React.useState('Create')
  
    //alert
    const notify = (message) => toast.success(message)
    const notifyE = (message) => toast.error(message)
  
    const handleChange = (e)=>{
      setForm({
        ...form,[e.target.name]:e.target.value
      })
    }
  
    const editData = (id)=>{
      setAction('Update')
      let [commission] = state.commissions.filter(el=>el.id===id);
      setForm(commission);
      handleOpen()
    }
  
    const setDataToDelete = (id) =>{
      let [commission] = state.commissions.filter(el=>el.id===id)
      handleOpenD()
      setUserD(commission)
    }
  
    const deleteData = () =>{
      deleteCommissions({id: userD.id, handleReset, setLoader});
    }
  
    const handleReset = (e)=>{
      handleClose()
      handleCloseD()
      setForm(initialForm)
    }
      
    React.useEffect(() => {
      getCommissions({setLoader});
    }, [])
  
    return (
      <>
      <ToastContainer autoClose={2000}/>
        <Loader display={loader}/>
        <div style={{padding:'5px'}}>
          <span style={{fontSize:'20px'}}>Commisions</span>
          <Fab color="primary" aria-label="add" size="small" onClick={()=>{handleOpen();setAction('Create');setForm(initialForm)}} style={{float:'right',marginBottom:'20px'}}>
            <AddIcon />
          </Fab>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Comission concept</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {!state.commissions
                ? <TableRow><TableCell></TableCell></TableRow>
                : 
                state.commissions.map((ex,index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{index+1}</TableCell>
                    <TableCell component="th" scope="row">
                      {ex.name}
                    </TableCell>
                    <TableCell>{ex.amount}</TableCell>
                    <TableCell style={{margin:'5px'}}>
                      <IconButton aria-label="edit" size="small" onClick={(e)=>editData(ex.id)}>
                        <EditIcon size="small"/>
                      </IconButton>
                      <IconButton aria-label="delete" size="small" onClick={(e)=>setDataToDelete(ex.id)}>
                        <DeleteIcon/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        
        <ModalCommissions
            form={form}
            handleChange = {handleChange}
            action={action}
            saveData={saveCommissions}
            handleClose={handleClose}
            handleReset={handleReset}
            setLoader = {setLoader}
            open={open}
          />
        <Alert_Dialog
          openD={openD}
          handleCloseD={handleCloseD}
          name={`${userD.name} ${userD.lastname}`}
          deleteData={deleteData}
        />
  
      </>
    )
}

export default Commissions;