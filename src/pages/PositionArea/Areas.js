import React, {useContext,useEffect} from 'react'
//Table
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'


import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import '../../styles/positionArea.css'

//Icons
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import { ToastContainer, toast } from 'react-toastify';

import { Context } from '../../context/PositionArea/PositionAreaContext'

const Areas = ({setOpenA,setAction,setName,setPositionId,setId,setLoader}) => {

  const {state, deleteArea} = useContext(Context)

  const editData = (id)=>{
    setAction('Update')
    let [area] = state.areas.filter(area=>area.id===id)
    setName(area.name);
    setPositionId(area.PositionId);
    setId(id)
    setOpenA(true);
  }

  return (
    <Box className='containerForm'>
        <ToastContainer autoClose={2000} />
        <div style={{padding:'5px'}}>
          <span style={{fontSize:'20px'}}>Areas</span>
          <Fab color="primary" aria-label="add" size="small" onClick={()=>{setOpenA(true); setAction("Create"); setName('');setPositionId('')}} style={{float:'right',marginBottom:'20px'}}>
            <AddIcon />
          </Fab>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.areas.map((area,index) => (
                <TableRow
                  key={area.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{index+1}</TableCell>
                  <TableCell component="th" scope="row">
                    {area.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {area.Position.name}
                  </TableCell>
                  <TableCell style={{margin:'5px'}}>
                    <IconButton aria-label="edit" size="small" onClick={() => editData(area.id)}>
                      <EditIcon size="small"/>
                    </IconButton>
                    <IconButton aria-label="delete" size="small" onClick={() => {deleteArea({id:area.id,setLoader}); toast.success('Area deleted');}}>
                      <DeleteIcon/>
                    </IconButton>
                  </TableCell>
                </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
    </Box>
  )
}

export default Areas