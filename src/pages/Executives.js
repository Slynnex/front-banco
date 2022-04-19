import React,{useState,useEffect} from 'react'
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

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import Grid from '@material-ui/core/Grid'

import axios from 'axios'

//Loader
import Loader from '../assets/Loader'

//icons
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

//forms-ui
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FormLabel  from '@material-ui/core/FormLabel'
import Input from '@material-ui/core/Input'
import FilledInput from '@material-ui/core/FilledInput'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormGroup from '@material-ui/core/FormGroup'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

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

const config = {
  headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjp7ImlkIjoxLCJuYW1lIjoiTWFudWVsIEFsZWphbmRvIEJhcmJhIEdvbnphbGV6Iiwicm9sIjoibWFuYWdlciJ9LCJpYXQiOjE2NTAzNzU4NjUsImV4cCI6MTY1MDQwNDY2NX0.hHMCMF1hLV0hXTwE6_5DIvRW4J-cs7zEgUiA5yEpO-0` }
}

const initialForm = {
  name:'',
  lastname:'',
  userid:'',
  password:'',
  PositionId:'',
  AreaId:'',
  BranchId:'1',
  date_init:new Date(),
  id:null
}

export default function Executives() {
  //info form
  const [form,setForm] = useState(initialForm)
  const [dataToEdit,setDataToEdit] = useState(null)
  //info from API
  const [data, setData] = useState([])
  const [positions, setPositions] = useState([])
  const [areas, setAreas] = useState([])
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

  const handleChange = (e)=>{
    setForm({
      ...form,[e.target.name]:e.target.value
    })
  }

  const editData = (id)=>{
    setAction('Update')
    let [user] = data.filter(el=>el.id===id)
    user.password = ''
    setForm(user)
    handleOpen()
  }

  const setDataToDelete = (id) =>{
    let [user] = data.filter(el=>el.id===id)
    handleOpenD()
    setUserD(user)
  }

  const deleteData = async ()=>{
    try{
      setLoader('flex')
      let executiveD = await axios.delete(`http://localhost:9000/api/v1/executives/${userD.id}`,config)
      setLoader('none')
      if(executiveD.status===200 && executiveD.statusText==='OK'){
        notify('Executive Deleted')
        refreshData()
        handleReset()
      }else{
        notifyE('ups something goes wrong')
      }
    }catch(error){
      notifyE(error.toString())
      console.log({error})
    }
  }

  const handleReset = (e)=>{
    handleClose()
    handleCloseD()
    setForm(initialForm)
    setDataToEdit(null)
  }

  const refreshData = async ()=>{
    let res = await axios.get('http://localhost:9000/api/v1/executives',config)
    setData(res.data.data)
  }

  const saveData = async ()=>{
    try{
      setLoader('flex')
      let executiveC = ';'
      if(form.id===null){
        executiveC = await axios.post('http://localhost:9000/api/v1/executives',form,config)
      }else{
        executiveC = await axios.put(`http://localhost:9000/api/v1/executives/${form.id}`,form,config)
      }
      if(executiveC.status===200 && executiveC.statusText==='OK'){
        form.id===null ?  notify('Executive Created') : notify('Executive Updated')
        refreshData()
        handleReset()
      }else{
        notifyE('ups something goes wrong')
      }
      setLoader('none')
    }catch(error){
      notifyE(error.toString())
      console.log({error})
    }
  }
    
  const updateData = ()=>{

  }

  useEffect(() => {
    const getData = async () =>{
      try{
        setLoader('flex')
        const [executivesF,positionsF,areasF] = await Promise.allSettled([
          axios.get('http://localhost:9000/api/v1/executives',config),
          axios.get('http://localhost:9000/api/v1/positions',config),
          axios.get('http://localhost:9000/api/v1/areas',config),
        ])
        setData(executivesF.value.data.data)
        setPositions(positionsF.value.data.data)
        setAreas(areasF.value.data.data)
        setLoader('none')
      }catch(err){
        console.log({err})
      }
    } 
    getData()
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
              <TableCell>Full Name</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Area</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {data.map((ex,index) => (
              <TableRow
                key={ex.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{index+1}</TableCell>
                <TableCell component="th" scope="row">
                  {`${ex.name} ${ex.lastname}`}
                </TableCell>
                <TableCell>{ex.userid}</TableCell>
                <TableCell>{ex.Position.name}</TableCell>
                <TableCell>{ex.Area.name}</TableCell>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {`${action} Executive`}
          </Typography>
          <FormControl fullWidth={true}>
            <InputLabel variant="standard" required={true}>Name</InputLabel>
            <Input id="name" name="name" aria-describedby="name" autoComplete='off' onChange={handleChange} value={form.name}/> 
          </FormControl>
          <FormControl fullWidth={true}>
            <InputLabel variant="standard" required={true}>Last Name</InputLabel>
            <Input id="lastname" name="lastname" aria-describedby="lastname" autoComplete='off' onChange={handleChange} value={form.lastname}/> 
          </FormControl>
          <FormControl fullWidth={true}>
            <InputLabel variant="standard" required={true}>User</InputLabel>
            <Input id="userid" name="userid" aria-describedby="userid" autoComplete='off'  onChange={handleChange} value={form.userid}/> 
          </FormControl>
          {action==='Create'?
          <FormControl fullWidth={true}>
            <InputLabel variant="standard" required={true}>Password</InputLabel>
            <Input id="password" name="password" aria-describedby="password" autoComplete='off' onChange={handleChange} value={form.password}/> 
          </FormControl>
          :<></>}
          <FormControl fullWidth>
            <InputLabel variant="standard" required={true} >Position</InputLabel>
            <Select id="PositionId" name="PositionId" onChange={handleChange} value={form.PositionId}>
              {positions.map((position,index)=>{
                return <MenuItem key={index} value={position.id}>{position.name}</MenuItem>
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel variant="standard" required={true}>Area</InputLabel>
            <Select id="AreaId" name="AreaId" onChange={handleChange} value={form.AreaId}>
              {areas.map((area,index)=>{
                return <MenuItem key={index} value={area.id}>{area.name}</MenuItem>
              })}
            </Select>
          </FormControl>
          <Grid>
            <Fab onClick={saveData} color="primary" aria-label="add" size="small" style={{float:'right',marginTop:'20px',marginRight:'10px'}}>
              <SaveIcon />
            </Fab>
            <Fab onClick={handleClose} color="secondary" aria-label="add" size="small" style={{float:'right',marginTop:'20px',marginRight:'10px'}}>
              <CancelIcon />
            </Fab>
          </Grid>
        </Box>
      </Modal>

      <Modal
        open={openD}
        onClose={handleCloseD}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
              Delete Executive
          </Typography>
              Are you sure to delete the executive <b>{`${userD.name} ${userD.lastname}`}</b> ?
          <Grid>
            <Fab onClick={deleteData} color="primary" aria-label="add" size="small" style={{float:'right',marginTop:'50px',marginRight:'10px'}}>
              <CheckCircleIcon />
            </Fab>
            <Fab onClick={handleCloseD} color="secondary" aria-label="add" size="small" style={{float:'right',marginTop:'50px',marginRight:'10px'}}>
              <CancelIcon />
            </Fab>
          </Grid>
          
        </Box>
      </Modal>

    </>
  )
}
