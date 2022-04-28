import React, { useContext } from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import Fab from '@material-ui/core/Fab'

//Icons
import CancelIcon from '@material-ui/icons/Cancel'
import SaveIcon from '@material-ui/icons/Save'
import { Context } from '../../context/PositionArea/PositionAreaContext'

const ModalPosition = ({ openP, setOpenP, action, name, setName, setLoader, id }) => {

  const { addPosition, editPosition } = useContext(Context)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #cecece',
    borderRadius: 10,
    boxShadow: '10px 5px 5px',
    p: 4,
  };

  const handleClose = () => {
    setOpenP(false);
  }
  const saveData = () => {
    if (action === 'Create') {
      addPosition({ setLoader, name, setOpenP });
    } else {
      editPosition({ setLoader, name, id, setOpenP })
    }
  }
  return (
    <Modal
      open={openP}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {`${action} Position`}
        </Typography>
        <FormControl fullWidth={true}>
          <InputLabel variant="standard" required={true}>Name</InputLabel>
          <Input id="name" name="name" aria-describedby="name" autoComplete='off' onChange={e => setName(e.target.value)} value={name} />
        </FormControl>
        <Grid>
          {name !== "" ?
            <Fab onClick={() => saveData()} color="primary" aria-label="add" size="small" style={{ float: 'right', marginTop: '20px', marginRight: '10px' }}>
              <SaveIcon />
            </Fab>
            :
            <Fab onClick={() => saveData()} disabled color="primary" aria-label="add" size="small" style={{ float: 'right', marginTop: '20px', marginRight: '10px' }}>
              <SaveIcon />
            </Fab>
          }
          <Fab onClick={handleClose} color="secondary" aria-label="add" size="small" style={{ float: 'right', marginTop: '20px', marginRight: '10px' }}>
            <CancelIcon />
          </Fab>
        </Grid>
      </Box>
    </Modal>
  )
}

export default ModalPosition