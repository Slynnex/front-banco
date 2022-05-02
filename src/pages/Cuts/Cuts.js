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
import ModalCuts from './ModalCuts';
import Alert_Dialog from '../../components/alert_dialog/Alert_Dialog'

import { Context } from '../../context/Cuts/CutsContext'
import jwt_decode from "jwt-decode";

const initialForm = {
  total_cut:0,
  type:'',
  CashboxId:'',
  denominations:{
    m10c:'',
    m50c:'',
    m1p:'',
    m2p:'',
    m5p:'',
    m10p:'',
    m20p:'',
    b20p:'',
    b50p:'',
    b100p:'',
    b200p:'',
    b500p:'',
    b1000p:'',
  },
  id:null
}

const Cuts = () => {
  const { saveCuts,getCuts, state, deleteCuts} = useContext(Context);

  //info form
  const [form,setForm] = useState(initialForm)

  //modal state vars
  const [open, setOpen] = useState(false)
  const [openD, setOpenD] = useState(false)
  const [isManager, setIsManager] = React.useState(false);
  const [cutD, setCutD] = useState(initialForm)
  const handleOpenD = () => setOpenD(true)
  const handleCloseD = () => setOpenD(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  //loading state
  const [loader, setLoader] = useState('none')
  //action state
  const [action, setAction] = useState('Create')




  const handleChange = (e)=>{
    
    let denominations = form.denominations
    if(e.target.name!=='type' && e.target.name!=='total_cut' && e.target.name!=='CashboxId'){
      denominations = {...form.denominations,[e.target.name]:e.target.value}
    }
    setForm({
      ...form,[e.target.name]:e.target.value,denominations:denominations
    })
  }

  const editData = (id)=>{
    setAction('Update')
    let [cut] = state.cuts.filter(el=>el.id===id)
    
    let cutDenomination = {
      total_cut:cut.total_cut,
      type:cut.type,
      CashboxId:cut.CashboxId,
      denominations:{
        m10c:'',
        m50c:'',
        m1p:'',
        m2p:'',
        m5p:'',
        m10p:'',
        m20p:'',
        b20p:'',
        b50p:'',
        b100p:'',
        b200p:'',
        b500p:'',
        b1000p:'',
      },
      id:cut.id
    }
    for (const de of cut.Denominations) {
      if(de.id in cutDenomination.denominations){
        cutDenomination.denominations[de.id]=de.DenominationCuts.amount
      }
    }

    setForm(cutDenomination)
    handleOpen()
  }

  const setDataToDelete = (id) =>{
    let [cut] = state.cuts.filter(el=>el.id===id)
    handleOpenD()
    setCutD(cut)
  }

  const deleteData = () =>{
    deleteCuts({id: cutD.id, handleReset, setLoader});
    toast.success('Cut deleted');
  }

  const handleReset = (e)=>{
    handleClose()
    handleCloseD()
    setForm(initialForm)
    if(action === 'Create'){
      toast.success('Cut created');
    }
    if(action === 'Update'){
      toast.success('Cut updated');
    }
  }
    
  useEffect(() => {
    getCuts({setLoader})
  }, [])

  useEffect(()=>{
    const token = localStorage.getItem('token');
    const decode = jwt_decode(token);
    if(decode.session.rol === 'manager'){
      setIsManager(true);
    }
  },[])


  return (
    <>
    <ToastContainer autoClose={2000}/>
      <Loader display={loader}/>
      <div style={{padding:'5px'}}>
        <span style={{fontSize:'20px'}}>Cuts</span>
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
              <TableCell>Cashbox</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>date</TableCell>
              <TableCell>total cut</TableCell>
              <TableCell>Executive</TableCell>
              <TableCell>Actions</TableCell>
              {/* <TableCell>total system</TableCell> */}
              {/* <TableCell>Diference</TableCell>
              <TableCell>Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {state.cuts !== null && state.cuts.map((ex,index) => (
              <TableRow
                key={ex.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{index+1}</TableCell>
                <TableCell>{ex.Cashbox.name}</TableCell>
                <TableCell>{ex.type}</TableCell>
                <TableCell>{ex.date.substring(0, 10)}</TableCell>
                <TableCell>{ex.total_cut}</TableCell>
                <TableCell>
                    {ex.Executive.name}<br></br>
                    {ex.Executive.lastname}
                </TableCell>
                {/* <TableCell>{!ex.total_system ? '-' :ex.total_system}</TableCell>
                <TableCell>{!ex.diference? '-' :ex.diference}</TableCell> */}
                <TableCell style={{margin:'5px'}}>
                  {isManager
                    ?null
                    :<IconButton aria-label="edit" size="small" onClick={(e)=>editData(ex.id)}>
                      <EditIcon size="small"/>
                    </IconButton>
                  }

                  {/* <IconButton aria-label="delete" size="small" onClick={(e)=>setDataToDelete(ex.id)}>
                    <DeleteIcon/>
                  </IconButton> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* modal */}
      
      <ModalCuts
          form={form}
          handleChange = {handleChange}
          action={action}
          saveData={saveCuts}
          handleClose={handleClose}
          handleReset={handleReset}
          setLoader = {setLoader}
          cashboxes = {state.cashboxes}
          total_system = {state.total_system}
          open={open}
          state={state}
          setForm = {setForm}
        />
      {/* <Alert_Dialog
        openD={openD}
        handleCloseD={handleCloseD}
        name={cutD.name}
        deleteData={deleteData}
      /> */}
    </> 
  )
}

export default Cuts