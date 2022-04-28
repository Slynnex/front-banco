import React, {useContext} from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Fab from '@material-ui/core/Fab'

import { Context } from '../../context/Clients/ClientsContext'

//Icons
import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'

const TableClient = ({editData,showData}) => {

    const {state} = useContext(Context)
  return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Full name</TableCell>
              <TableCell>Curp</TableCell>
              <TableCell>Account</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
             {state.clients.map((cl, index) => (
                 <TableRow
                 key={cl.id}
                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{index+1}</TableCell>
                  <TableCell>{cl.name} {cl.lastname}</TableCell>
                  <TableCell>{cl.curp}</TableCell>
                  <TableCell>
                    {cl.Accounts.map((el,index)=>(
                      <li key={index}>{cl.Accounts[index].no_acc}</li>                      
                    ))}
                  </TableCell>
                  <TableCell>
                    {cl.Accounts.map((el,index)=>(
                      <li key={index}>{cl.Accounts[index].type}</li>                      
                    ))}
                  </TableCell>
                  <TableCell>
                    {cl.Accounts.map((el,index)=>(
                      <li key={index}>{cl.Accounts[index].amount}</li>                      
                    ))}
                  </TableCell>
                  <TableCell style={{margin:'5px'}}>
                  <IconButton aria-label="edit" size="small" onClick={(e)=>editData(cl.id)}>
                    <EditIcon size="small"/>
                  </IconButton>
                  <IconButton aria-label="delete" size="small" onClick={(e)=>showData(cl.id)}>
                    <VisibilityIcon/>
                  </IconButton>
                </TableCell>
                </TableRow>
             ))

             }
          </TableBody>
        </Table>
    </TableContainer>
  )
}

export default TableClient