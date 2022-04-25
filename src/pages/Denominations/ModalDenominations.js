import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
//Icons
import Fab from '@material-ui/core/Fab'
import CancelIcon from '@material-ui/icons/Cancel'
import SaveIcon from '@material-ui/icons/Save'


const ModalDenominations = ({ form, handleChange, handleClose, open, handleReset, setLoader, saveData, action }) => {
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
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {`${action} Denomination`}
        </Typography>
        {action === 'Create' ?
          <FormControl fullWidth={true}>
            <InputLabel variant="standard" required={true}>ID</InputLabel>
            <Input id="id" name="id" aria-describedby="id" autoComplete='off' onChange={handleChange} value={form.id} />
          </FormControl>
          : <></>
        }

        <FormControl fullWidth={true}>
          <InputLabel variant="standard" required={true}>Name</InputLabel>
          <Input id="name" name="name" aria-describedby="name" autoComplete='off' onChange={handleChange} value={form.name} />
        </FormControl>


        <FormControl fullWidth={true}>
          <InputLabel variant="standard" required={true}>value</InputLabel>
          <Input id="value" name="value" aria-describedby="value" autoComplete='off' onChange={handleChange} value={form.value} />
        </FormControl>

        <Grid>
          <Fab onClick={() => saveData({ form, id: form.id, setLoader, handleReset, action })} color="primary" aria-label="add" size="small" style={{ float: 'right', marginTop: '20px', marginRight: '10px' }}>
            <SaveIcon />
          </Fab>
          <Fab onClick={handleClose} color="secondary" aria-label="add" size="small" style={{ float: 'right', marginTop: '20px', marginRight: '10px' }}>
            <CancelIcon />
          </Fab>
        </Grid>
      </Box>
    </Modal>
  )
}

export default ModalDenominations