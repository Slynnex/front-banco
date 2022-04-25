import React,{useState,useEffect,useContext} from 'react'
import { Context } from '../../context/Concepts/ConceptsContext'
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
import Alert_Dialog from '../../components/alert_dialog/Alert_Dialog'
import ModalConcepts from './ModalConcepts'

// Form: new concept
const initialForm = {
  id:null,
  name:''
}

export default function Concepts() {

  const { saveConcepts, getConcepts, state, deleteConcept} = useContext(Context);

  //info form
  const [form,setForm] = useState(initialForm);

  //modal state vars
  const [open, setOpen] = useState(false)
  const [openD, setOpenD] = useState(false)
  const [conceptD, setConceptD] = useState(initialForm)
  const handleOpenD = () => setOpenD(true)
  const handleCloseD = () => setOpenD(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  //loading state
  const [loader, setLoader] = useState('none');

  //action state
  const [action, setAction] = useState('Create');

  const handleChange = (e)=>{
    setForm({
      ...form,[e.target.name]:e.target.value
    })
  }

  // Edit concepts
  const editData = (id)=>{
    setAction('Update');
    let [editConcept] = state.concepts.filter(el=>el.id===id);
    setForm(editConcept);
    handleOpen();
    console.log("edit Concept: ");
    console.log(editConcept);
  }

  // Delete data
  const setDataToDelete = (id) =>{
    let [delConcept] = state.concepts.filter(el=>el.id===id)
    handleOpenD()
    setConceptD(delConcept)
  }

  const deleteData = () =>{
    deleteConcept({id: conceptD.id, handleReset, setLoader});
  }

  // use Effect
  useEffect(() => {
    getConcepts({setLoader});
  },[])

  useEffect(() => {
    console.log("useEffect: ")
    console.log(state);
  },[state])

  // Handle reset
  const handleReset = (e)=>{
    handleClose()
    handleCloseD()
    setForm(initialForm)
  }

  return (
    <>
    <ToastContainer autoClose={2000}/>
      <Loader display={loader}/>
      <div style={{padding:'5px'}}>
        <span style={{fontSize:'20px'}}>Concepts</span>
        <Fab color="primary" aria-label="add" size="small" onClick={()=>{handleOpen();setAction('Create');setForm(initialForm)}} style={{float:'right',marginBottom:'20px'}}>
          <AddIcon />
        </Fab>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Concept</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {state.concepts.map((ex,index) => (
              <TableRow
                key={ex.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{index+1}</TableCell>
                <TableCell component="th" scope="row">
                  {`${ex.name}`} </TableCell>
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
      
      <ModalConcepts
          form={form}
          handleChange = {handleChange}
          action={action}
          saveData={saveConcepts}
          handleClose={handleClose}
          handleReset={handleReset}
          setLoader = {setLoader}
          open={open}
        />

      <Alert_Dialog 
        openD={openD}
        handleCloseD={handleCloseD}
        name={`${conceptD.name}`}
        deleteData={deleteData}
      />

    </>
  )
}
