import React, {useContext} from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { Context } from '../../context/Clients/ClientsContext'

const TableClient = () => {

    const {state} = useContext(Context)
  return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Full name</TableCell>
              <TableCell>Curp</TableCell>
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
                </TableRow>
             ))

             }
          </TableBody>
        </Table>
    </TableContainer>
  )
}

export default TableClient