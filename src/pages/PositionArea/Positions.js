import React,{useContext, useEffect} from 'react'
//Material UI
import Box from '@material-ui/core/Box'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'

import Fab from '@material-ui/core/Fab'
import '../../styles/positionArea.css'

//Icons
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'

import { Context } from '../../context/PositionArea/PositionAreaContext'

const Positions = ({setOpenP,setAction,setName,setId,setLoader}) => {

  const {state,deletePosition} = useContext(Context)

  const editData = (id)=>{
    setAction('Update')
    let [position] = state.positions.filter(el=>el.id===id)
    setName(position.name);
    setId(id)
    setOpenP(true);
  }

  return (
    <Box className='containerForm'>
        <div style={{padding:'5px'}}>
          <span style={{fontSize:'20px'}}>Positions</span>
          <Fab color="primary" aria-label="add" size="small" onClick={()=>{setOpenP(true); setAction("Create"); setName('')}} style={{float:'right',marginBottom:'20px'}}>
            <AddIcon />
          </Fab>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.positions.map((position,index) => (
                <TableRow
                  key={position.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{index+1}</TableCell>
                  <TableCell component="th" scope="row">
                    {position.name}
                  </TableCell>
                  <TableCell style={{margin:'5px'}}>
                    <IconButton aria-label="edit" size="small" onClick={() => editData(position.id)}>
                      <EditIcon size="small"/>
                    </IconButton>
                    <IconButton aria-label="delete" size="small" onClick={() => deletePosition({id: position.id,setLoader})}>
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

export default Positions