import React,{useState,useEffect,useContext} from 'react'
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
import ModalCreditDetails from './ModalCreditDetails';
import Alert_Dialog from '../../components/alert_dialog/Alert_Dialog'

import { Context } from '../../context/CreditDetails/CreditDetailsContext'

const initialForm = {
  name:'',
  debterms:'',
  interests:'',
  extra_charge:'',
  id:null
}

const CreditDetails = () => {
  const { saveCreditDetails,getCreditDetails, state, deleteCreditDetails} = useContext(Context);

  //info form
  const [form,setForm] = useState(initialForm)

  //modal state vars
  const [open, setOpen] = useState(false)
  const [openD, setOpenD] = useState(false)
  const [creditDetailD, setCreditDetailD] = useState(initialForm)
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

  const handleChange = (e)=>{
    setForm({
      ...form,[e.target.name]:e.target.value
    })
  }

  const editData = (id)=>{
    setAction('Update')
    let [creditdetail] = state.creditDetails.filter(el=>el.id===id)
    setForm(creditdetail)
    handleOpen()
  }

  const setDataToDelete = (id) =>{
    let [creditdetail] = state.creditDetails.filter(el=>el.id===id)
    handleOpenD()
    setCreditDetailD(creditdetail)
  }

  const deleteData = () =>{
    deleteCreditDetails({id: creditDetailD.id, handleReset, setLoader});
  }

  const handleReset = (e)=>{
    handleClose()
    handleCloseD()
    setForm(initialForm)
  }
    
  useEffect(() => {
    getCreditDetails({setLoader})
  }, [])


  return (
    <>
    <ToastContainer autoClose={2000}/>
      <Loader display={loader}/>
      <div style={{padding:'5px'}}>
        <span style={{fontSize:'20px'}}>Ejecutivos</span>
        <Fab color="primary" aria-label="add" size="small" onClick={()=>{handleOpen();setAction('Create');setForm(initialForm)}} style={{float:'right',marginBottom:'20px'}}>
          <AddIcon />
        </Fab>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Debterms</TableCell>
              <TableCell>Interests</TableCell>
              <TableCell>Extra_charge</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {state.creditDetails.map((ex,index) => (
              <TableRow
                key={ex.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{index+1}</TableCell>
                <TableCell component="th" scope="row">
                  {ex.name}
                </TableCell>
                <TableCell>{ex.debterms}</TableCell>
                <TableCell>{ex.interest}</TableCell>
                <TableCell>{ex.extra_charge}</TableCell>
                <TableCell style={{margin:'5px'}}>
                  <IconButton aria-label="edit" size="small" onClick={(e)=>editData(ex.id)}>
                    <EditIcon size="small"/>
                  </IconButton>
                  <IconButton aria-label="delete" size="small" onClick={(e)=>setDataToDelete(ex.id)}>
                    <DeleteIcon/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* modal */}
      
      <ModalCreditDetails
          form={form}
          handleChange = {handleChange}
          action={action}
          saveData={saveCreditDetails}
          handleClose={handleClose}
          handleReset={handleReset}
          setLoader = {setLoader}
          open={open}
        />
      <Alert_Dialog
        openD={openD}
        handleCloseD={handleCloseD}
        name={creditDetailD.name}
        deleteData={deleteData}
      />
    </> 
  )
}

export default CreditDetails